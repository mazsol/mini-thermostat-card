/**
 * Imported from Home Assistant frontend codebase.
 * Source: https://github.com/home-assistant/frontend/blob/dev/src/common/entity/supports-feature.ts
 * Date: 2026-01-01
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HassEntity } from 'home-assistant-js-websocket';

export const supportsFeature = (stateObj: HassEntity, feature: number): boolean =>
  supportsFeatureFromAttributes(stateObj.attributes, feature);

export const supportsFeatureFromAttributes = (attributes: Record<string, any>, feature: number): boolean =>
  (attributes.supported_features! & feature) !== 0;
