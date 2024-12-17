import React from 'react';
import { GlobalProvider } from './contexts/GlobalContext';
import Router from './navigation/Router';

const App = () => {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
};

export default App;
