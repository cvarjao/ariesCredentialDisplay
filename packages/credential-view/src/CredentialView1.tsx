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
      <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
        <View style={{flex: 4}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 0, height: 15, backgroundColor: 'cyan'}} />
            <View style={{flex: 1, height: 60}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, backgroundColor: 'cyan'}} />
                <View style={{flex: 2, minHeight: 50}}><Text>{"1"}</Text></View>
                <View style={{flex: 1, backgroundColor: 'cyan'}} />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 14,
            flexDirection: 'column',
            backgroundColor: '#C9FFE5',
          }}>
            <View style={{flex: 0, minHeight: 42, flexDirection: 'row'}}>
              <View style={{flex: 12}}>
                <View style={{flex: 0, height: 15, backgroundColor: 'cyan'}}/>
                <View style={{flex: 0, height: 20, backgroundColor: 'yellow'}}><Text style={styles.fieldLabelText}>{"Government of British Columbia"}</Text></View>
                <View style={{flex: 0, minHeight: 22, backgroundColor: 'yellow'}}><Text style={styles.fieldValueText}>{"Business License"}</Text></View>
              </View>
              <View style={{flex: 2, minHeight: 52, backgroundColor: 'red'}}/>
            </View>
            <View style={{flex: 0, height: 20, backgroundColor: 'green'}} ><Text style={styles.fieldLabelText}>{"Business Name:"}</Text></View>
            <View style={{flex: 0, minHeight: 22, backgroundColor: 'yellow'}}><Text style={styles.fieldValueText}>{"Some Extremely Ultra Mega Long Business's Name"}</Text></View>
            <View style={{flex: 0, height: 20, backgroundColor: 'green'}} ><Text style={styles.fieldLabelText}>{"Business Type:"}</Text></View>
            <View style={{flex: 0, minHeight: 22, backgroundColor: 'yellow'}}><Text style={styles.fieldValueText}>{"Some Extremely Ultra Mega Long Business's Type"}</Text></View>
            <View style={{flex: 0, height: 15, backgroundColor: 'cyan'}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldLabelText: {
    fontFamily: 'verdana',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fieldValueText: {
    fontFamily: 'verdana',
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'wrap',
  },
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
