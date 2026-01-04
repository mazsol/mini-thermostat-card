// Production version
import { customElement } from 'lit/decorators.js';
import { MiniThermostatCardBase, getDefaultStubConfig } from './mini-thermostat-card-base';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';
import { HomeAssistant } from './types';
import './mini-thermostat-card-editor';

/* eslint no-console: 0 */
console.info(
  `%c  MINI-THERMOSTAT-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// Register the card with Home Assistant
declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mini-thermostat-card',
  name: localize('card.name'),
  description: localize('card.description'),
});

@customElement('mini-thermostat-card')
export class MiniThermostatCard extends MiniThermostatCardBase {
  public static async getConfigElement() {
    return document.createElement('mini-thermostat-card-editor');
  }

  public static getStubConfig(hass?: HomeAssistant) {
    return getDefaultStubConfig(hass);
  }
}
