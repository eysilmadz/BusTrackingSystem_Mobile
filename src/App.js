import React from 'react';
import { GlobalProvider } from './contexts/GlobalContext';
import Router from './navigation/Router';
import { FavouriteProvider } from './contexts/FavouriteContext';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <FavouriteProvider>
        <GlobalProvider>
          <Router />
        </GlobalProvider>
      </FavouriteProvider>
    </UserProvider>
  );
};

export default App;
