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
  const layout = bundle.getOverlay<AriesCredentialLayoutLayerv1>(
    AriesCredentialLayoutLayerv1Name,
  );
  const borderRadius = Math.max(20, width * 0.02);
  const padding = Math.max(0, width * 0.05);
  const fieldSeparatorSpacer = 16;

  return (
    <View
      style={[
        {width: width, minHeight: (width * .3), backgroundColor: layout?.primary_background_color, borderRadius: borderRadius},
      ]}>
        <View style={{position:'relative', top: 0, left: (width * 0.2), width: (width * 0.8), backgroundColor:'blue'}}>
          <View style={{marginTop: (width * 0.05), backgroundColor:'cyan', marginRight: (width * 0.05), marginBottom: (width * 0.05)}}>
            <Text style={styles.fieldLabelText}>{"Government of British Columbia"}</Text>
            <Text style={styles.fieldValueText}>{"Person"}</Text>
            <View style={{height: fieldSeparatorSpacer}}/>
            <Text style={styles.fieldLabelText}>{"Given Names"}</Text>
            <Text style={styles.fieldValueText}>{"My long name My long name My long name My long name My long name My long name  My long name"}</Text>
            <View style={{height: fieldSeparatorSpacer}}/>
            <Text style={styles.fieldLabelText}>{"Given Names"}</Text>
            <Text style={styles.fieldValueText}>{"My long name My long name My long name My long name My long name My long name  My long name"}</Text>
          </View>
        </View>
        <View style={{position:'absolute', top: 0, left: 0, width: (width * 0.10), height: '100%', backgroundColor:'red'}}/>
        <View style={{position:'absolute', top: 0, right: 0, width: (width * 0.10), height: (width * 0.10), backgroundColor:'green'}}/>
        <View style={{position:'absolute', top: padding, left: (width * 0.05), width: (width * 0.10), height: (width * 0.10), backgroundColor:'yellow'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  fieldLabelText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 14,
  },
  fieldValueText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 18,
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
