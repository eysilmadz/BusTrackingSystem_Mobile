import React, { createContext, useState, useContext } from "react";

// Context oluştur
const FavouriteContext = createContext();

// Context sağlayıcı
export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (routeId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(routeId)
        ? prevFavourites.filter((id) => id !== routeId)
        : [...prevFavourites, routeId]
    );
  };

  return (
    <FavouriteContext.Provider value={{ favourites, setFavourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

// Context'i kullanmak için hook
export const useFavouriteContext = () => useContext(FavouriteContext);
