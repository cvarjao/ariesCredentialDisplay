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
  const meta = bundle?.getMetaOverlay('en');
  const layout = bundle?.getOverlay<AriesCredentialLayoutLayerv1>(
    AriesCredentialLayoutLayerv1Name,
  );
  const borderRadius = 10;
  const padding = Math.max(0, width * 0.05);
  const fieldSeparatorSpacer = 16;
  const margin = width * .05
  const logoBoxSize =  width * 0.12
  const statusBoxSize =  width * 0.12
  
  const styles = StyleSheet.create({
    fieldFirstLabelText: {
      marginRight: (statusBoxSize / 2) + margin,
      opacity: 0.8,
      marginTop: 0
    },
    fieldLabelText: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: 14,
      backgroundColor: 'purple',
      marginTop: margin
    },
    fieldValueText: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: 18,
      flexWrap: 'wrap',
      backgroundColor: 'purple'
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
  });
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
          overflow: 'hidden',
        },
      ]}>
      <View
        style={{
          position: 'relative',
          top: 0,
          left: width * 0.2,
          width: width * 0.8,
        }}>
        <View
          style={{
            marginTop: width * 0.05,
            backgroundColor: '#4DA6FF',
            marginRight: width * 0.05,
            marginBottom: width * 0.05,
          }}>
          <Text
            style={[styles.fieldLabelText, styles.fieldFirstLabelText]}>
            {'Government of British Columbia 1 2 3 4'}
          </Text>
          <Text style={[styles.fieldValueText, {marginRight: (statusBoxSize / 2) + margin}]}>
            {'Person 1 2 3 4 4 5 6 7 8 9 0 1'}
          </Text>
          <Text style={styles.fieldLabelText}>{'Given Names'}</Text>
          <Text style={styles.fieldValueText}>{credential.id}</Text>
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
          width: width * 0.12,
          backgroundColor: 'red',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: statusBoxSize,
          height: statusBoxSize,
          backgroundColor: 'green',
          borderTopRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
        }}
      />
      <Image
        source={toImageSource(layout?.logo)}
        resizeMethod={'scale'}
        style={{
          position: 'absolute',
          resizeMode: 'center',
          top: margin,
          left: margin,
          width: logoBoxSize,
          height: logoBoxSize,
        }}
      />
    </View>
  );
};

export default CredentialView;
