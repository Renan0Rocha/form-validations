import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import RegistrationForm from './src/screens/RegistrationForm';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <RegistrationForm />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
