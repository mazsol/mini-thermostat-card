// Test/Dev version with different custom element name
import { customElement } from 'lit/decorators.js';
import { MiniThermostatCardBase } from './mini-thermostat-card-base';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
  `%c  MINI-THERMOSTAT-CARD-TEST \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

@customElement('mini-thermostat-card-test')
export class MiniThermostatCardTest extends MiniThermostatCardBase {}
