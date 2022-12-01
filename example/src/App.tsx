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
  StatusBar,
  useColorScheme,
  Dimensions,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {CredentialExchangeRecord} from '@aries-framework/core';
import {CredentialView1, CredentialView2} from '@aries-framework/credential-view';
import {
  OCACredentialBundle,
  DefaultOCACredentialBundle,
  OverlayType,
} from '@aries-framework/aries-oca-core';

import {
  AriesCredentialLayoutLayerv1Name,
  AriesCredentialLayoutLayerv1,
} from '@aries-framework/aries-oca-layers';

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

const {width: screenWidth} = Dimensions.get('window');

const bundle: OCACredentialBundle = new DefaultOCACredentialBundle({
  overlays: [
    {
      capture_base: '',
      type: AriesCredentialLayoutLayerv1Name,
      primary_background_color: '#4DA6FF',
      logo: require('./assets/react-native-logo.png'),
      background_image_slice: require('./assets/cred-slice.png'),
    } as AriesCredentialLayoutLayerv1,
  ],
  capture_base: {capture_base: '', type: OverlayType.BASE_10},
});
const ItemDivider = () => {
  return (
    <View
      style={{
        height: 10,
        width: '100%',
        backgroundColor: '#607D8B',
      }}
    />
  );
}
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
        numColumns={1}
        keyExtractor={credential => credential.id}
        ItemSeparatorComponent={ItemDivider}
        renderItem={({item: credential}) => {
          return (
            <CredentialView2
              credential={credential}
              width={screenWidth}
              bundle={bundle}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default App;
