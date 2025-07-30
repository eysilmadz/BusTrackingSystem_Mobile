import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "../../components/BottomSheet";
import styles from "../../pages/HowToGetScreen/HowToGet.style";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getStationByCity } from "../../api/StationService";

const TABS = [
    { key: "TIME", label: "En kısa süre" },
    { key: "WALK", label: "En az yürüme" },
    { key: "DISTANCE", label: "En kısa mesafe" },
];

export default function HowToDetail() {
    const route = useRoute();
    const { routesByType, fromLocation, toLocation } = route.params || {};
    const [selectedTab, setSelectedTab] = useState("TIME");
    const mapRef = useRef(null);
    const [stationList, setStationList] = useState([]);

    if (!routesByType || !routesByType[selectedTab]) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Rota verisi bulunamadı.</Text>
            </View>
        );
    }

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const stations = await getStationByCity(42);
                if (Array.isArray(stations)) {
                    setStationList(stations);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchStations();
    }, []);


    useEffect(() => {
        if (!mapRef.current || !routesByType[selectedTab]) return;

        const coords = [];

        routesByType[selectedTab].segments.forEach((segment) => {
            const fromCoord = getStationCoords(segment.fromStationId);
            const toCoord = getStationCoords(segment.toStationId);

            if (fromCoord) coords.push(fromCoord);
            if (toCoord) coords.push(toCoord);
        });

        if (coords.length > 0) {
            mapRef.current.fitToCoordinates(coords, {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
            });
        }
    }, [selectedTab, routesByType, stationList]);

    const getStationCoords = (stationId) => {
        const station = stationList.find((s) => s.id === stationId);
        if (!station) {
            return null;
        }
        if (!station.location) {
            return null;
        }

        const parts = station.location.split(/[, ]+/);
        if (parts.length < 2) {
            return null;
        }

        const lat = parseFloat(parts[0].replace(",", "."));
        const lon = parseFloat(parts[1].replace(",", "."));

        if (isNaN(lat) || isNaN(lon)) {
            return null;
        }

        return { latitude: lat, longitude: lon };
    };

    const getStationName = (stationId) => {
        const station = stationList.find((s) => s.id === stationId);
        return station ? station.name : stationId;
    };

    const routeData = routesByType[selectedTab];
    const { segments, totalDistance, totalDuration } = routeData;

    // Başlangıç zamanı: şu an olarak ayarlanabilir, dilersen kullanıcıdan alınabilir
    const startDateTime = new Date();

    // Segmentlerin başlangıç saatlerini hesapla
    let cumulativeMinutes = 0;
    const segmentsWithTimes = segments.map(segment => {
        const segmentStartTime = new Date(startDateTime.getTime() + cumulativeMinutes * 60000);
        cumulativeMinutes += segment.durationMin;
        return { ...segment, startTime: segmentStartTime };
    });

   const renderAllSegments = () => (
    <View style={styles.card}>
        <Text style={styles.summary}>
            Süre: {totalDuration.toFixed(0)} dk | Mesafe: {totalDistance.toFixed(2)} km
        </Text>

        {segmentsWithTimes.map((segment, idx) => (
            <View key={idx} style={styles.segment}>
                <Icon
                    name={segment.mode === "WALK" ? "walk" : "bus"}
                    size={24}
                    color="#666"
                />
                <View style={styles.segmentInfo}>
                    <Text style={styles.text}>
                        {segment.startTime && (
                            <Text style={{ fontWeight: "600", color: "#333" }}>
                                {segment.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}’da {' '}
                            </Text>
                        )}
                        {segment.mode === "WALK" ? (
                            segment.fromStationId ? (
                                <>
                                    {getStationName(segment.fromStationId)} durağından {getStationName(segment.toStationId)} durağına yürüyün.
                                </>
                            ) : (
                                `Yürüyerek devam edin.`
                            )
                        ) : (
                            <>
                                <Text style={{ fontWeight: "bold", color: "#222" }}>{segment.routeLine}</Text>
                                {'\n'}
                                {getStationName(segment.fromStationId)} durağından binin → {getStationName(segment.toStationId)} durağında inin.
                            </>
                        )}
                        {'\n'}
                        <Text style={{ fontWeight: "500", color: "#555", fontSize: 14, lineHeight: 20 }}>
                            Süre: {segment.durationMin.toFixed(0)} dk | Mesafe: {segment.distanceKm.toFixed(2)} km
                        </Text>
                    </Text>
                </View>
            </View>
        ))}
    </View>
);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: fromLocation.coords.latitude,
                        longitude: fromLocation.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                >
                    <Marker coordinate={fromLocation.coords} title="Başlangıç" pinColor="orange" />
                    <Marker coordinate={toLocation.coords} title="Varış" pinColor="red" />

                    {segments.map((segment, idx) => {
                        const fromCoord = getStationCoords(segment.fromStationId);
                        const toCoord = getStationCoords(segment.toStationId);

                        if (!fromCoord || !toCoord) return null;

                        return (
                            <React.Fragment key={idx}>
                                <Polyline
                                    coordinates={[fromCoord, toCoord]}
                                    strokeColor={
                                        segment.mode === "WALK"
                                            ? "#666"
                                            : segment.mode === "BUS"
                                                ? "#4097ff"
                                                : "#4097ff"
                                    }
                                    strokeWidth={4}
                                />
                                <Marker key={`from-${segment.fromStationId}`} coordinate={fromCoord} title={getStationName(segment.fromStationId)}>
                                    <Image source={require("../../assets/images/busStop.png")} style={{ width: 18, height: 18 }} />
                                </Marker>

                                <Marker key={`to-${segment.toStationId}`} coordinate={toCoord} title={getStationName(segment.toStationId)}>
                                    <Image source={require("../../assets/images/busStop.png")} style={{ width: 18, height: 18 }} />
                                </Marker>
                            </React.Fragment>
                        );
                    })}
                </MapView>
                <BottomSheet>
                    <View style={styles.tabBarContainer}>
                        {TABS.map((tab) => (
                            <TouchableOpacity
                                key={tab.key}
                                style={[styles.tabItem, selectedTab === tab.key && styles.tabItemActive]}
                                onPress={() => setSelectedTab(tab.key)}
                            >
                                <Text style={[styles.tabText, selectedTab === tab.key && styles.tabTextActive]}>
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {renderAllSegments()}
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}
