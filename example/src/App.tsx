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

import {
  CredentialExchangeRecord,
  CredentialMetadataKeys,
} from '@aries-framework/core';
import {CredentialView2} from '@aries-framework/credential-view';
import {
  OCACredentialBundle,
  DefaultOCACredentialBundle,
  OverlayType,
  DefaultOCABundleResolver,
  Bundles,
  Bundle,
} from '@aries-framework/aries-oca-core';

import {
  AriesCredentialLayoutLayerv1Name,
  AriesCredentialLayoutLayerv1,
} from '@aries-framework/aries-oca-layers';

const mockCredential = (seed: any) => {
  const cred = new CredentialExchangeRecord({
    ...seed,
    createdAt: new Date(),
  });
  cred.metadata.set(CredentialMetadataKeys.IndyCredential, {
    schemaId: 'ABC',
    credentialDefinitionId: 'ABC1',
  });
  return cred;
};

const credentials: CredentialExchangeRecord[] = [
  mockCredential({id: 'AA1234'}),
  mockCredential({id: 'AB4567'}),
  mockCredential({id: 'BA1234'}),
  mockCredential({id: 'BB4567'}),
];

const {width: screenWidth} = Dimensions.get('window');

const bundle: Bundle = {
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
};
const bundles: Bundles = {ABC: bundle};

class MyCABundleResolver extends DefaultOCABundleResolver {
  public async resolveWithDefaultBundle(
    _credential: CredentialExchangeRecord,
  ): Promise<OCACredentialBundle> {
    const bundle1 = await this.resolve(_credential);
    if (bundle1 === undefined) {
      throw new Error('Ooooopppps!');
    }
    return bundle1;
  }
}

const resolver = new MyCABundleResolver().loadBundles(bundles);

const ItemDivider = () => {
  return (
    <View
      style={{
        height: screenWidth * 0.05,
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
              resolver={resolver}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default App;
