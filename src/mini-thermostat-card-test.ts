// Test/Dev version with different custom element name
import { customElement } from 'lit/decorators.js';
import { MiniThermostatCardBase } from './mini-thermostat-card-base';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';
import { html } from 'lit-html';

/* eslint no-console: 0 */
console.info(
  `%c  MINI-THERMOSTAT-CARD-TEST \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

@customElement('mini-thermostat-card-test')
export class MiniThermostatCardTest extends MiniThermostatCardBase {
  protected renderDebugInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return html` <div class="debug-info">${width}x${height}</div> `;
  }
}
