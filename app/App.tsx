import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './navigation/RootStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootStack />
    </SafeAreaProvider>
  );
}