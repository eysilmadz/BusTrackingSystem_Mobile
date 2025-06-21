import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Keyboard, FlatList, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import tr from 'date-fns/locale/tr';
import styles from "../../pages/HowToGetScreen/HowToGet.style";
import Dropdown from "../../components/Dropdown";
import { getRouteSegments } from "../../api/PlannerService";

const TABS = [
  { key: 'TIME', label: 'En kısa süre' },
  { key: 'WALK', label: 'En az yürüme' },
  { key: 'DISTANCE', label: 'En kısa mesafe' },
];

function HowToGet({ route }) {
  const { location, city } = route.params;
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [selectingField, setSelectingField] = useState(null);
  const [isOpenStops, setIsOpenStops] = useState(false); // Dropdown için durak seçimi
  const [selectedStop, setSelectedStop] = useState(null);
  const [selectedTab, setSelectedTab] = useState('TIME'); //rota sonuçları ve seçili sekme
  const [routesByType, setRoutesByType] = useState(null);
  const [fromSelectedByUser, setFromSelectedByUser] = useState(false);


  useEffect(() => {
    if (location?.coords && fromLocation === null) {
      setFromLocation({
        coords: location.coords,
        address: 'Nereden'
      });
    }
  }, [location]);

  // Dropdown’dan durak seçildiğinde ilgili alana ata
  useEffect(() => {
    if (selectedStop && selectingField) {
      // location string formatı "lat,lon"
      const [lat, lon] = selectedStop.location.split(',').map(Number);
      const target = { coords: { latitude: lat, longitude: lon }, address: selectedStop.name };
      if (selectingField === 'from') setFromLocation(target);
      else setToLocation(target);
      setSelectingField(null);
    }
  }, [selectedStop]);

  // Kullanıcı mevcut konum seçtiğinde
  const applyPropLocation = () => {
    if (location?.coords) {
      const target = { coords: location.coords, address: 'Mevcut Konum' };
      selectingField === 'from'
        ? setFromLocation(target)
        : setToLocation(target);
    }
    setSelectingField(null);
  };

  useEffect(() => {
    const { pickedLocation, field } = route.params || {};
    if (pickedLocation) {
      if (field === 'from') {
        setFromLocation(pickedLocation);
      } else if (field === 'to') {
        setToLocation(pickedLocation);
      }
      setSelectingField(null);
      // ➋ Tekrar tetiklememesi için temizleyelim
      navigation.setParams({ pickedLocation: undefined, field: undefined });
    }
  }, [route.params?.pickedLocation]);

  useEffect(() => {
    const { toLocation } = route.params || {};
    if (toLocation) {
      setToLocation(toLocation);
      setTimeout(() => {
        navigation.setParams({ toLocation: undefined });
      }, 100);
    }
  }, [route.params?.toLocation]);

  const handleStopSelect = (stop) => {
    // location string formatı "lat,lon"
    const [lat, lon] = stop.location.split(',').map(Number);
    const target = {
      coords: { latitude: lat, longitude: lon },
      address: stop.name
    };
    if (selectingField === 'from') {
      setFromLocation(target);
    } else {
      setToLocation(target);
    }
    setSelectingField(null);
  };

  // Haritadan seçmeye yönlendir
  const applyMapPick = () => {
    navigation.navigate('MapPicker', {
      initialLocation: fromLocation,
      field: selectingField,             // “from” veya “to”
    });
  };


  const createRoute = async () => {
    if (!fromLocation || !toLocation) {
      Alert.alert('Uyarı', 'Lütfen başlangıç ve varış noktalarını seçin.');
      return;
    }
    Keyboard.dismiss();

    try {
      // ➊ Türleri belirliyoruz
      const types = ['DISTANCE', 'TIME', 'WALK'];

      // ➋ Promise.all içinde her bir getRouteSegments çağrısı, bir Axios yanıt objesi (response) döner
      const results = await Promise.all(
        types.map(type =>
          getRouteSegments(
            fromLocation.coords.latitude,
            fromLocation.coords.longitude,
            toLocation.coords.latitude,
            toLocation.coords.longitude,
            type
          )
        )
      );

      // ➌ results artık tanımlı, aynı blokta hemen kullanabiliriz
      //    Her bir results[i] bir Axios response objesi; gerçek segment dizisi response.data içinde
      const byType = {
        DISTANCE: [results[0]],
        TIME: [results[1]],
        WALK: [results[2]],
      };

      setRoutesByType(byType);
      setSelectedTab('DISTANCE'); console.log('🚌 byType:', byType);
      console.log('🚌 selectedTab:', selectedTab);
    } catch (err) {
      console.error('Rota oluşturma hatası:', err.response?.data || err.message);
      Alert.alert('Hata', 'Rota oluşturulurken bir sorun çıktı.');
    }


  };

  // Karte basınca segment dizisini ikoncuklu bir kart olarak gösteriyoruz
  const renderRouteCard = ({ item: segments, index }) => {
    console.log('→ renderRouteCard segments.length =', segments)
    return (
      <View style={styles.card}>
        <FlatList
          data={segments}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardSegment}>
              <Icon name={item.mode === 'WALK' ? 'walk' : 'bus'} size={24} />
              <Text style={styles.cardSegText}>
                {item.mode === 'WALK'
                  ? `${item.durationMin.toFixed(0)} dk`
                  : item.routeLine}
              </Text>
            </View>
          )}
        />
      </View>
    )
  }


  const isSelecting = selectingField === 'from' || selectingField === 'to';
  const selectionLabel = selectingField === 'from' ? 'Nereden' : 'Nereye';

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Icon name={"location-outline"} size={30} color={'#666'} />
            <Text style={{
              fontSize: 25, color: '#666', fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.1)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 3
            }}>
              {isSelecting ? selectionLabel : 'Nasıl Giderim?'}
            </Text>
          </View>
          {isSelecting && (
            <TouchableOpacity onPress={() => setSelectingField(null)}>
              <Icon name="close-circle-outline" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        {isSelecting ? (
          <>
            <View style={styles.selectionContainer}>
              <Dropdown
                placeholder="Durak Ara"
                iconName="search-outline"
                isOpen={isOpenStops}
                setIsOpen={setIsOpenStops}
                dataType="stops"
                selectedCity={city}
                selectedItem={selectedStop}
                setSelectedItem={setSelectedStop}
                onSelect={handleStopSelect}
                setSelectedStop={setSelectedStop}
              />
              <View style={{ backgroundColor: 'white', borderRadius: 12, marginVertical: '2%', marginHorizontal: '4%', shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 4, }}>
                <TouchableOpacity style={styles.optionButton} onPress={applyPropLocation}>
                  <View style={styles.icon}>
                    <Icon name="navigate-circle-outline" size={24} color='#fff' />
                  </View>
                  <Text style={styles.optionText}>Mevcut Konumum</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionButton} onPress={applyMapPick}>
                  <View style={styles.icon}>
                    <Icon name="map-outline" size={24} color='#fff' />
                  </View>
                  <Text style={styles.optionText}>Haritadan Seç</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.innerContainer}>
              <View style={{ marginHorizontal: 10 }}>
                <Icon name="location-outline" size={24} color="#555" />
                <Icon name="ellipsis-vertical" size={20} color="#777" style={{ marginVertical: 6 }} />
                <Icon name="location-sharp" size={24} color="#555" />
              </View>
              <View style={{ width: '95%' }}>
                <TouchableOpacity
                  onPress={() => setSelectingField('from')}
                  style={[styles.input, { paddingVertical: 12 }]}
                >
                  <Text style={{ fontSize: 20, color: '#777' }}>
                    {fromLocation?.address || 'Nereden'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  onPress={() => setSelectingField('to')}
                  style={[styles.input, { paddingVertical: 12 }]}
                >
                  <Text style={{ fontSize: 20, color: '#777' }}>
                    {toLocation?.address || 'Nereye'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => setOpen(true)} style={styles.picker}>
                <Icon name={"calendar-number-outline"} size={20} />
                <Text style={{ fontSize: 18 }}>
                  {format(date, 'dd MMM yyyy | HH:mm', { locale: tr })}
                </Text>
                <Icon name={"time-outline"} size={20} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={createRoute} style={styles.button}>
                <Text style={{ fontSize: 20, fontWeight: '500', color: '#555' }}>
                  Rota Oluştur
                </Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              locale="tr"           // ay isimleri için Türkçe
              open={open}
              date={date}
              title={null}
              mode="datetime"
              style={{ justifyContent: 'center' }}
              confirmText="Tamam"
              cancelText="İptal"
              onConfirm={(d) => {
                setOpen(false);
                setDate(d);
              }}
              onCancel={() => {
                setOpen(false);

              }}
            />
          </>

        )}
      </View>
      {routesByType && (
        <View style={styles.bottomContainer}>

          {/* Sekmeler */}
          <View style={styles.tabBarContainer}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabItem,
                  selectedTab === tab.key && styles.tabItemActive
                ]}
                onPress={() => setSelectedTab(tab.key)}
              >
                <Text style={[
                  styles.tabText,
                  selectedTab === tab.key && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Rota Kartları */}
          <FlatList
            data={routesByType[selectedTab]}
            keyExtractor={(_, i) => i.toString()}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={renderRouteCard}
            contentContainerStyle={{ paddingBottom: 24 }}
          />

        </View>
      )}
    </SafeAreaView>
  )
}

export default HowToGet;