import React from 'react';
import AppNavigation from './Navigation/appNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigation />
      </GestureHandlerRootView>
  );
};

export default App;