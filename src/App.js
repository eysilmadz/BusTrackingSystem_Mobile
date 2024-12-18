import React from 'react';
import { GlobalProvider } from './contexts/GlobalContext';
import Router from './navigation/Router';
import { FavouriteProvider } from './contexts/FavouriteContext';

const App = () => {
  return (
    <FavouriteProvider>
      <GlobalProvider>
        <Router />
      </GlobalProvider>
    </FavouriteProvider>
  );
};

export default App;
