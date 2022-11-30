/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {CredentialExchangeRecord} from '@aries-framework/core';
import CredentialView from './lib/components/CredentialView';

const mockCredential = (seed: any) => {
  return {
    ...seed,
    createdAt: new Date(),
  } as unknown as CredentialExchangeRecord;
};
const credentials: CredentialExchangeRecord[] = [
  mockCredential({id: 'AA1234'}),
  mockCredential({id: 'AB4567'}),
  mockCredential({id: 'BA1234'}),
  mockCredential({id: 'BB4567'}),
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        data={credentials}
        numColumns={2}
        keyExtractor={credential => credential.id}
        renderItem={({item: credential}) => {
          return <CredentialView credential={credential} />;
        }}
      />
    </SafeAreaView>
  );
};

export default App;
