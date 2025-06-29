// FavouriteContext.js - Düzeltilmiş versiyon

import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAlert from '../components/ModalAlert';

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [favouriteRoutes, setFavouriteRoutes] = useState([]);
  const [favouriteStations, setFavouriteStations] = useState([]);

  // Modal için state'ler
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAlert, setModalAlert] = useState('');
  const [modalButtons, setModalButtons] = useState([]);

  // Favorileri AsyncStorage'a kaydet
  const saveFavouritesToStorage = async (routes, stations) => {
    try {
      const favourites = { routes, stations };
      await AsyncStorage.setItem("@favourites", JSON.stringify(favourites));
      console.log("Favoriler kaydedildi:", favourites);
    } catch (error) {
      console.error("Error saving favourites:", error);
    }
  };

  // Favorileri AsyncStorage'dan yükle
  const loadFavouritesFromStorage = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem("@favourites");
      if (storedFavourites) {
        const { routes = [], stations = [] } = JSON.parse(storedFavourites);
        
        // Stations array'ini temizle - sadece obje olanları al
        const cleanedStations = stations.filter(station => 
          typeof station === 'object' && station !== null && 
          (station.stationId || station.id) && station.stationsName
        );
        
        console.log("Yüklenen favori stations (temizlenmiş):", cleanedStations);
        setFavouriteRoutes(routes);
        setFavouriteStations(cleanedStations);
      }
    } catch (error) {
      console.error("Error loading favourites:", error);
    }
  };

  // AsyncStorage'ı temizle (gerekirse)
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem("@favourites");
      console.log("AsyncStorage temizlendi");
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavouritesFromStorage();
    } else {
      setFavouriteRoutes([]);
      setFavouriteStations([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavouritesToStorage(favouriteRoutes, favouriteStations);
    }
  }, [favouriteRoutes, favouriteStations, user]);

  const toggleRouteFavourite = (route, navigation) => {
    if (!user) {
      setModalTitle("Hata");
      setModalAlert("Favorilere eklemek için giriş yapmanız gerekiyor.");
      setModalButtons([
        { text: "Tamam", onPress: () => setModalVisible(false) },
        {
          text: "Giriş Yap", onPress: () => {
            setModalVisible(false);
            if (navigation) navigation.navigate("Login");
          }
        },
      ]);
      setModalVisible(true);
      return;
    }

    const id = route.routeId || route.id;
    if (!id) return;

    setFavouriteRoutes((prevFavourites) => {
      const isAlreadyFavourite = prevFavourites.some(r => (r.routeId || r.id) === id);
      if (isAlreadyFavourite) {
        return prevFavourites.filter(r => (r.routeId || r.id) !== id);
      } else {
        return [...prevFavourites, { ...route, routeId: id }];
      }
    });
  };

  const toggleStationFavourite = (station, navigation) => {
    if (!user) {
      setModalTitle("Hata");
      setModalAlert("Lütfen favori eklemek için önce giriş yapınız.");
      setModalButtons([
        { text: "Tamam", onPress: () => setModalVisible(false) },
        {
          text: "Giriş Yap", onPress: () => {
            setModalVisible(false);
            if (navigation) navigation.navigate("Login");
          }
        },
      ]);
      setModalVisible(true);
      return;
    }

    const id = station.stationId || station.id;
    if (!id) {
      console.log("Station ID bulunamadı:", station);
      return;
    }

    console.log("Toggle station çağrıldı:", station);

    setFavouriteStations((prevFavourites) => {
      const isAlreadyFavourite = prevFavourites.some(s => (s.stationId || s.id) === id);
      
      if (isAlreadyFavourite) {
        console.log("Station kaldırılıyor:", id);
        return prevFavourites.filter(s => (s.stationId || s.id) !== id);
      } else {
        console.log("Station ekleniyor:", { ...station, stationId: id });
        return [...prevFavourites, { ...station, stationId: id }];
      }
    });
  };

  return (
    <FavouriteContext.Provider
      value={{
        favouriteRoutes,
        favouriteStations,
        toggleRouteFavourite,
        toggleStationFavourite,
        setFavouriteRoutes,
        setFavouriteStations,
        modalVisible,
        setModalVisible,
        modalTitle,
        modalAlert,
        modalButtons,
        clearAsyncStorage, // Debug için
      }}
    >
      {children}
      <ModalAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={modalTitle}
        alert={modalAlert}
        buttons={modalButtons}
      />
    </FavouriteContext.Provider>
  );
};

export const useFavouriteContext = () => useContext(FavouriteContext);