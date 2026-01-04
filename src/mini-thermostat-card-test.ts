// Test/Dev version with different custom element name
import { customElement } from 'lit/decorators.js';
import { MiniThermostatCardBase, getDefaultStubConfig } from './mini-thermostat-card-base';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';
import { html } from 'lit-html';
import { HomeAssistant } from './types';
import './mini-thermostat-card-editor-test';

/* eslint no-console: 0 */
console.info(
  `%c  MINI-THERMOSTAT-CARD-TEST \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
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
  type: 'mini-thermostat-card-test',
  name: localize('card.name_test'),
  description: localize('card.description_test'),
});

@customElement('mini-thermostat-card-test')
export class MiniThermostatCardTest extends MiniThermostatCardBase {
  public static async getConfigElement() {
    return document.createElement('mini-thermostat-card-editor-test');
  }

  public static getStubConfig(hass?: HomeAssistant) {
    return getDefaultStubConfig(hass);
  }

  protected renderDebugInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return html` <div class="debug-info">Screen: ${width}x${height}</div>`;
  }
}
