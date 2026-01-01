// Base class for Mini Thermostat Card
import { CSSResultGroup, LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant } from './types';
import { HassEntity } from 'home-assistant-js-websocket';
import debounceFn from 'debounce-fn';

import { ICONS, MODE_ICONS } from './const';
import { MINI_THERMOSTAT_CARD_STYLE } from './styles';

export interface MiniThermostatCardConfig {
  entity: string;
  name?: string;
  layout?: string;
  temp_unit: boolean | string;
  step_size?: number;
  show_name?: boolean;
  show_sensor_labels?: boolean;
  show_related_entities?: boolean;
}

export class MiniThermostatCardBase extends LitElement {
  @property({ type: Object }) public config!: MiniThermostatCardConfig;
  private _hass!: HomeAssistant;
  updatingValues: boolean = false;
  stepSize: number = 1;
  showName: boolean = true;
  showRelatedEntities: boolean = false;
  showLabels: boolean = false;
  temp: number = 0;
  stateObj!: HassEntity;
  releatedEntities!: [string, import('/workspaces/mini-thermostat-card/src/types').EntityRegistryEntry][];
  layout: string = 'row';

  set hass(hass: HomeAssistant) {
    const oldHass = this._hass;
    this._hass = hass;

    if (this.config && oldHass !== hass) {
      this._updateFromHass();
    }

    this.requestUpdate('hass', oldHass);
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  private _updateFromHass(): void {
    if (!this.config.entity) return;

    this.stateObj = this.hass.states[this.config.entity];
    if (!this.stateObj) {
      console.warn(`Entity ${this.config.entity} not found`);
      return;
    }

    const stateEntity = this.hass.entities[this.stateObj.entity_id];
    this.releatedEntities = Object.entries(this.hass.entities).filter(([key, entity]) => {
      return (
        key !== stateEntity.entity_id &&
        entity['device_id'] === stateEntity.device_id &&
        entity['platform'] === stateEntity.platform
      );
    });

    const temp = this.updatingValues ? this.temp : this.stateObj ? this.stateObj.attributes.temperature : html`---`;
    if (this.updatingValues && this.temp === temp) {
      this.updatingValues = false;
    } else {
      this.temp = temp;
    }
  }

  public setConfig(config: MiniThermostatCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;

    this.updatingValues = false;
    this.stepSize = this.config?.step_size ? +this.config.step_size : 1;
    this.showName = this.config?.show_name ?? true;
    this.showRelatedEntities = this.config?.show_related_entities ?? false;
    this.showLabels = this.config?.show_sensor_labels ?? true;
    this.layout = this.config?.layout ?? 'row';
  }

  public getCardSize(): number {
    if (this.layout === 'row') {
      return this.showRelatedEntities ? 3 : 2;
    } else {
      return this.showRelatedEntities ? 4 : 3;
    }
  }

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    if (!this.stateObj) {
      return html`<div class="not-found">Entity not found: ${this.config.entity}</div>`;
    }

    const isLayoutRow = this.config.layout === 'row';
    const name = this.showName ? this.config.name || this.stateObj.attributes.friendly_name || '' : '';
    const iconLT = isLayoutRow ? ICONS.PLUS : ICONS.UP;
    const iconRB = isLayoutRow ? ICONS.MINUS : ICONS.DOWN;
    const tempUnit = this.getTempUnit();
    const currentTemp = this.stateObj ? this.stateObj.attributes.current_temperature : html`---`;
    const showTempUnit = tempUnit !== false;
    const stateString = this.haLocalize(this.stateObj.state, 'component.climate.entity_component._.state.');

    const debugInfoHtml = this.renderDebugInfo();

    const sensorHtml = [
      html` ${this.showName ? html`<div class="card-title">${name}</div>` : ''} `,
      this.renderSensorItem({
        hide: false,
        state: currentTemp + (showTempUnit ? ' ' + tempUnit : ''),
        details: {
          heading: this.showLabels ? this.haLocalize('ui.card.climate.currently') : false,
        },
      }),
      this.renderSensorItem({
        hide: false,
        state: stateString,
        details: {
          heading: this.showLabels ? this.haLocalize('ui.panel.lovelace.editor.card.generic.state') : false,
        },
      }),
    ];

    return html`
      <ha-card class="${this.stateObj.state}">
        ${debugInfoHtml}
        <section id="tempControls">
          <div class="sensors">
            <div class="sensor-container">${sensorHtml}</div>
          </div>
          <div class="temp-control${isLayoutRow ? ' row' : ' col'}">
            <ha-icon-button class="first" @click=${() => this.setTemperature(this.stepSize)}>
              <ha-icon style="display:flex" icon="${iconLT}"></ha-icon>
            </ha-icon-button>
            <div class="current-value">
              <h3 class="current-value ${this.updatingValues ? 'updating' : ''}">${this.temp}</h3>
              ${showTempUnit ? html`<span class="temp-unit">${tempUnit}</span>` : ''}
            </div>
            <ha-icon-button class="last" @click=${() => this.setTemperature(-this.stepSize)}>
              <ha-icon style="display:flex" icon="${iconRB}"></ha-icon>
            </ha-icon-button>
          </div>
        </section>
        <div id="modes">
          ${this.stateObj.attributes.hvac_modes.map((hvacMode) => {
            const selected = this.stateObj.state === hvacMode;
            const modeLabel = this.haLocalize(hvacMode, 'component.climate.entity_component._.state.');
            return html`
              <div class="mode-item ${selected ? 'selected-mode' : ''}" title="${modeLabel}">
                <ha-icon-button class="" @click=${() => this.setHvacMode(this.stateObj, hvacMode)}>
                  <ha-icon style="display:flex" icon="${MODE_ICONS[hvacMode]}"></ha-icon>
                </ha-icon-button>
              </div>
            `;
          })}
        </div>
        ${this.showRelatedEntities
          ? html`
              <div id="relatedEntities">
                <div class="modes-title"></div>
                ${this.releatedEntities.map((entity) => {
                  const relatedStateObj = this.hass.states[entity[0]];
                  const icon = this.getIcon(relatedStateObj);
                  const active = relatedStateObj.state !== 'off';
                  // Get friendly name and clean up ID prefixes and suffixes
                  let entityName = relatedStateObj.attributes.friendly_name || relatedStateObj.entity_id.split('.')[1];
                  // Remove hex ID prefix (e.g., "502cc6c52f2d Panel fény" -> "Panel fény")
                  entityName = entityName.replace(/^[0-9a-f]{12,}\s+/i, '');
                  // Remove entity_id suffix in parentheses (e.g., "Panel Light (switch.xxx)" -> "Panel Light")
                  entityName = entityName.replace(/\s*\(.*?\)\s*$/g, '').trim();
                  return html`
                    <div class="related-item ${active ? 'active-state' : ''}" title="${entityName}">
                      <ha-icon-button class="" @click=${() => this.toggleState(relatedStateObj)}>
                        <ha-icon style="display:flex" icon="${icon}"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `;
                })}
              </div>
            `
          : ''}
      </ha-card>
    `;
  }

  protected renderDebugInfo() {
    return html``;
  }

  private _debouncedCallService = debounceFn(
    (temp: number) => {
      this._hass.callService('climate', 'set_temperature', {
        entity_id: this.config.entity,
        temperature: temp,
      });
      this.updatingValues = false;
    },
    { wait: 1000 },
  );

  private setTemperature(stepSize: number) {
    this.updatingValues = true;
    this.temp += stepSize;
    this.requestUpdate();
    this._debouncedCallService(this.temp);
  }

  private setHvacMode(stateObj, hvacMode) {
    if (stateObj.state !== hvacMode) {
      this._hass.callService('climate', 'set_hvac_mode', {
        entity_id: this.config.entity,
        hvac_mode: hvacMode,
      });
    }
  }

  private toggleState(stateObj) {
    console.log('>toggleState: ' + stateObj.state);
    if (stateObj.attributes.device_class === 'switch') {
      this._hass.callService('homeassistant', 'toggle', {
        entity_id: stateObj.entity_id,
      });
    }
  }

  private renderSensorItem({ hide, state, details }) {
    if (hide || typeof state === 'undefined') return html``;

    return html`
      <div class="sensor-row">
        ${details.heading ? html`<div class="sensor-header">${details.heading}:</div>` : ''}
        <div class="sensor-value">${state}</div>
      </div>
    `;
  }

  private haLocalize(label, prefix = '') {
    const lang = this.hass.selectedLanguage || this.hass.language;
    const key = `${prefix}${label}`;
    const translations = this.hass.resources[lang];
    return translations?.[key] ?? label;
  }

  private getIcon(stateObj) {
    const device_class = stateObj.attributes.device_class;
    const entity_id = stateObj.entity_id;
    return stateObj.attributes.icon
      ? stateObj.attributes.icon
      : this.getIconByDomain(device_class, entity_id, stateObj.state);
  }

  private getIconByDomain(device_class, entity_id, state) {
    let iconOn = '';
    let iconOff = '';
    switch (device_class) {
      case 'switch':
        if (typeof state === 'string') {
          if (entity_id.includes('fresh_air')) {
            iconOn = 'mdi:air-filter';
            iconOff = 'mdi:air-filter';
          } else if (entity_id.includes('quiet')) {
            iconOn = 'mdi:headphones';
            iconOff = 'mdi:headphones-off';
          } else if (entity_id.includes('fan')) {
            iconOn = 'mdi:fan';
            iconOff = 'mdi:fan-off';
          } else if (entity_id.includes('panel_light')) {
            iconOn = 'mdi:lightbulb';
            iconOff = 'mdi:lightbulb-outline';
          }
        }
        if (iconOn === '') {
          iconOn = 'mdi:light-switch';
          iconOff = 'mdi:light-switch-off';
        }
    }
    return state === 'on' ? iconOn : iconOff;
  }

  private getTempUnit() {
    if (['boolean', 'string'].includes(typeof this.config.temp_unit)) {
      return this.config?.temp_unit;
    }
    return this.hass.config?.unit_system?.temperature ?? false;
  }

  static get styles(): CSSResultGroup {
    return [MINI_THERMOSTAT_CARD_STYLE, css``];
  }
}
