import React, { createContext, useState, useContext } from "react";

// Context oluştur
const FavouriteContext = createContext();

// Context sağlayıcı
export const FavouriteProvider = ({ children }) => {
  const [favouriteRoutes, setFavouriteRoutes] = useState([]);
  const [favouriteStations, setFavouriteStations] = useState([]);

  const toggleRouteFavourite = (routeId) => {
    setFavouriteRoutes((prevFavourites) =>
      prevFavourites.includes(routeId)
        ? prevFavourites.filter((id) => id !== routeId)
        : [...prevFavourites, routeId]
    );
  };

  const toggleStationFavourite = (stationId) => {
    setFavouriteStations((prevFavourites) =>
      prevFavourites.includes(stationId)
        ? prevFavourites.filter((id) => id !== stationId)
        : [...prevFavourites, stationId]
    );
  };

  return (
    <FavouriteContext.Provider value={{ favouriteRoutes, favouriteStations, toggleRouteFavourite, toggleStationFavourite, setFavouriteRoutes, setFavouriteStations  }}>
      {children}
    </FavouriteContext.Provider>
  );
};

// Context'i kullanmak için hook
export const useFavouriteContext = () => useContext(FavouriteContext);
