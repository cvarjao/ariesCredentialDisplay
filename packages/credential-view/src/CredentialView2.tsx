import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Image, ImageSourcePropType} from 'react-native';
import {CredentialExchangeRecord} from '@aries-framework/core';
import {OCACredentialBundle, OCABundleResolver} from '@aries-framework/aries-oca-core';
import {
  AriesCredentialLayoutLayerv1Name,
  AriesCredentialLayoutLayerv1,
} from '@aries-framework/aries-oca-layers';

interface CredentialCardProps {
  credential: CredentialExchangeRecord;
  width: number;
  resolver: OCABundleResolver;
}

const toImageSource = (source: unknown): ImageSourcePropType => {
  if (typeof source === 'string') {
    return {uri: source as string};
  }
  return source as ImageSourcePropType;
};

const CredentialView: React.FC<CredentialCardProps> = ({
  credential,
  width,
  resolver,
}) => {
  const [bundle, setBundle] = useState<OCACredentialBundle | undefined>(undefined)
  const layout = bundle?.getOverlay<AriesCredentialLayoutLayerv1>(
    AriesCredentialLayoutLayerv1Name,
  );
  const borderRadius = Math.max(20, width * 0.02);
  const padding = Math.max(0, width * 0.05);
  const fieldSeparatorSpacer = 16;
  useEffect(() => {
    if (!credential) {
      return
    }
    resolver.resolveWithDefaultBundle(credential).then(async (_bundle) => {
      setBundle(_bundle)
    })
  }, [credential, resolver])
  return (
    <View
      style={[
        {
          width: width,
          minHeight: width * 0.3,
          backgroundColor: layout?.primary_background_color,
          borderRadius: borderRadius,
        },
      ]}>
      <View
        style={{
          position: 'relative',
          top: 0,
          left: width * 0.2,
          width: width * 0.8,
          backgroundColor: 'blue',
        }}>
        <View
          style={{
            marginTop: width * 0.05,
            backgroundColor: 'cyan',
            marginRight: width * 0.05,
            marginBottom: width * 0.05,
          }}>
          <Text
            style={[
              styles.fieldLabelText,
              {paddingRight: width * 0.1, opacity: 0.8},
            ]}>
            {'Government of British Columbia'}
          </Text>
          <Text style={[styles.fieldValueText, {paddingRight: width * 0.1}]}>
            {'Person 1 2 3 4 4 5 6 7 8 9 0 1 2'}
          </Text>
          <View style={{height: fieldSeparatorSpacer}} />
          <Text style={styles.fieldLabelText}>{'Given Names'}</Text>
          <Text style={styles.fieldValueText}>{credential.id}</Text>
          <View style={{height: fieldSeparatorSpacer}} />
        </View>
      </View>
      <Image
        source={toImageSource(layout?.background_image_slice)}
        resizeMethod={'scale'}
        style={{
          resizeMode: 'repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          width: width * 0.1,
          backgroundColor: 'red',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: width * 0.1,
          height: width * 0.1,
          backgroundColor: 'green',
        }}
      />
      <Image
        source={toImageSource(layout?.logo)}
        resizeMethod={'scale'}
        style={{
          position: 'absolute',
          resizeMode: 'center',
          top: padding,
          left: width * 0.05,
          width: width * 0.1,
          height: width * 0.1,
        }}
      />
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
