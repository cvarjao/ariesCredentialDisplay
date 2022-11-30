import React from 'react';
import {useColorScheme, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CredentialExchangeRecord} from '@aries-framework/core';
import {OCACredentialBundle} from '@aries-framework/aries-oca-core';
import {
  AriesCredentialLayoutLayerv1Name,
  AriesCredentialLayoutLayerv1,
} from '@aries-framework/aries-oca-layers';

interface CredentialCardProps {
  credential: CredentialExchangeRecord;
  width: number;
  bundle: OCACredentialBundle;
}
const CredentialView: React.FC<CredentialCardProps> = ({
  credential,
  width,
  bundle,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const layout = bundle.getOverlay<AriesCredentialLayoutLayerv1>(
    AriesCredentialLayoutLayerv1Name,
  );
  return (
    <View
      style={[
        {width: width, backgroundColor: layout.primary_background_color},
      ]}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, height: 15}} />
        <View style={{flex: 1, flexDirection: 'row', height: 15}}>
          <View style={{flex: 1, backgroundColor: '#E52B50'}}>
            <Text>{'1.1'}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#e82c51'}}>
            <Text>{'2'}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#c92646'}}>
            <Text>{'3'}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#a8203b'}}>
            <Text>{'4'}</Text>
          </View>
          <View style={{flex: 10, backgroundColor: '#C9FFE5'}}>
            <Text>{'5'}</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', height: 15}}>
          <View style={{flex: 1, backgroundColor: '#E52B50'}}>
            <Text>{'1.2'}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#e82c51'}}>
            <Text>{'2'}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#c92646'}}>
            <Text>{'3'}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#a8203b'}}>
            <Text>{'4'}</Text>
          </View>
          <View style={{flex: 10, backgroundColor: '#C9FFE5'}}>
            <Text>{'5'}</Text>
          </View>
        </View>
        <View style={{flex: 1, height: 15}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default CredentialView;
