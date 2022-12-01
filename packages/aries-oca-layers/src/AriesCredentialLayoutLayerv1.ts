import {BaseOverlay} from '@aries-framework/aries-oca-core';

export type Uri = string | NodeRequire;
export type RgbColor = string;

export interface OverlayHeader {
  color?: string;
  backgroundColor?: string;
  imageSource?: string;
  hideIssuer?: boolean;
}

export interface OverlayFooter {
  color?: string;
  backgroundColor?: string;
}

export const AriesCredentialLayoutLayerv1Name = 'spec/overlays/card_layout/1.0';
export interface AriesCredentialLayoutLayerv1 extends BaseOverlay {
  logo?: Uri;
  background_image_slice?: Uri;
  primary_background_color?: RgbColor;
  secondary_background_color?: RgbColor;
  primary_attribute?: string;
  secondary_attribute?: string;
}
