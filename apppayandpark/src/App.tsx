import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes/index';

const App: React.FC = () => (
  // <StatusBar barStyle="light-content" backgroundColor="#312e38" translucent />

  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#FCFCFC" translucent />
    <AppProvider>
      <View style={{flex: 1, backgroundColor: '#FCFCFC'}}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
