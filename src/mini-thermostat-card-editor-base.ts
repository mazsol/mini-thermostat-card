import { LitElement, html, css, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { mdiArrowDown, mdiArrowUp } from '@mdi/js';
import { property, state } from 'lit/decorators.js';
import { fireEvent } from './ha-frontend/common/dom/fire_event';
import { HomeAssistant } from './types';
import { MiniThermostatCardConfig } from './mini-thermostat-card-base';
import { localize } from './localize/localize';
import { supportsFeature } from './ha-frontend/common/entity/supports-feature';
import { computeDomain } from './ha-frontend/common/entity/compute_domain';
import { ClimateEntityFeature } from './ha-frontend/data/climate';
import { WaterHeaterEntityFeature } from './ha-frontend/data/water_heater';

export class MiniThermostatCardEditorBase extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: MiniThermostatCardConfig;
  @state() private _loaded = false;

  public setConfig(config: MiniThermostatCardConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    const stateObj = this._config.entity ? this.hass.states[this._config.entity] : undefined;
    const domain = stateObj ? computeDomain(stateObj.entity_id) : '';

    // Check supported features
    const supportPresetMode =
      stateObj && domain === 'climate' && supportsFeature(stateObj, ClimateEntityFeature.PRESET_MODE);
    const supportFanMode = stateObj && domain === 'climate' && supportsFeature(stateObj, ClimateEntityFeature.FAN_MODE);
    const supportSwingMode =
      stateObj && domain === 'climate' && supportsFeature(stateObj, ClimateEntityFeature.SWING_MODE);
    const supportAwayMode =
      stateObj && domain === 'water_heater' && supportsFeature(stateObj, WaterHeaterEntityFeature.AWAY_MODE);

    return html`
      <div class="card-config">
        <!-- Entity selector -->
        <ha-select
          label="${localize('editor.entity')}"
          .value=${this._config.entity}
          .configValue=${'entity'}
          @selected=${this._valueChanged}
          @closed=${(ev) => ev.stopPropagation()}
        >
          ${this._getClimateEntities().map(
            (entity) => html`
              <mwc-list-item value="${entity.entity_id}"> ${entity.friendly_name || entity.entity_id} </mwc-list-item>
            `,
          )}
        </ha-select>

        <!-- Name -->
        <ha-textfield
          label="${localize('editor.name')}"
          .value=${this._config.name || ''}
          .configValue=${'name'}
          @input=${this._valueChanged}
        ></ha-textfield>

        <!-- Layout -->
        <ha-select
          label="${localize('editor.layout')}"
          .value=${this._config.layout || 'row'}
          .configValue=${'layout'}
          @selected=${this._valueChanged}
          @closed=${(ev) => ev.stopPropagation()}
        >
          <mwc-list-item value="row">${localize('editor.layout_row')}</mwc-list-item>
          <mwc-list-item value="col">${localize('editor.layout_col')}</mwc-list-item>
        </ha-select>

        <!-- Display Mode -->
        <ha-select
          label="${localize('editor.display_mode')}"
          .value=${this._config.display_mode || 'buttons'}
          .configValue=${'display_mode'}
          @selected=${this._valueChanged}
          @closed=${(ev) => ev.stopPropagation()}
        >
          <mwc-list-item value="buttons">${localize('editor.display_buttons')}</mwc-list-item>
          <mwc-list-item value="dropdown">${localize('editor.display_dropdown')}</mwc-list-item>
        </ha-select>

        <!-- Step Size -->
        <ha-textfield
          label="${localize('editor.step_size')}"
          type="number"
          .value=${this._config.step_size || 1}
          .configValue=${'step_size'}
          @input=${this._valueChanged}
        ></ha-textfield>

        <!-- Temperature Unit -->
        <!-- Temperature Unit Display -->
        <ha-select
          label="${localize('editor.temp_unit')}"
          .value=${this._getTempUnitMode()}
          .configValue=${'_temp_unit_mode'}
          @selected=${this._tempUnitModeChanged}
          @closed=${(ev) => ev.stopPropagation()}
        >
          <mwc-list-item value="default">${localize('editor.temp_unit_default')}</mwc-list-item>
          <mwc-list-item value="hidden">${localize('editor.temp_unit_hidden')}</mwc-list-item>
          <mwc-list-item value="custom">${localize('editor.temp_unit_custom')}</mwc-list-item>
        </ha-select>

        ${(() => {
          const mode = this._getTempUnitMode();
          if (mode === 'custom') {
            return html`
              <ha-textfield
                label="${localize('editor.custom_temp_unit')}"
                .value=${typeof this._config.temp_unit === 'string' ? this._config.temp_unit : ''}
                .configValue=${'temp_unit'}
                @input=${this._valueChanged}
              ></ha-textfield>
            `;
          }
          return nothing;
        })()}

        <!-- Checkboxes -->
        <ha-formfield label="${localize('editor.show_name')}">
          <ha-switch
            .checked=${this._config.show_name !== false}
            .configValue=${'show_name'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="${localize('editor.show_sensor_labels')}">
          <ha-switch
            .checked=${this._config.show_sensor_labels !== false}
            .configValue=${'show_sensor_labels'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="${localize('editor.show_modes')}">
          <ha-switch
            .checked=${this._config.show_modes !== false}
            .configValue=${'show_modes'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="${localize('editor.show_preset_modes')}">
          <ha-switch
            .checked=${this._config.show_preset_modes === true}
            .configValue=${'show_preset_modes'}
            .disabled=${!supportPresetMode}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        ${this._config.show_preset_modes && supportPresetMode ? this._renderPresetModesEditor(stateObj) : nothing}

        <ha-formfield label="${localize('editor.show_fan_modes')}">
          <ha-switch
            .checked=${this._config.show_fan_modes === true}
            .configValue=${'show_fan_modes'}
            .disabled=${!supportFanMode}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="${localize('editor.show_swing_modes')}">
          <ha-switch
            .checked=${this._config.show_swing_modes === true}
            .configValue=${'show_swing_modes'}
            .disabled=${!supportSwingMode}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="${localize('editor.show_away_mode')}">
          <ha-switch
            .checked=${this._config.show_away_mode === true}
            .configValue=${'show_away_mode'}
            .disabled=${!supportAwayMode}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield label="${localize('editor.show_related_entities')}">
          <ha-switch
            .checked=${this._config.show_related_entities === true}
            .configValue=${'show_related_entities'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  private _renderPresetModesEditor(stateObj) {
    const available: string[] = stateObj?.attributes.preset_modes || [];
    if (!available.length) return nothing;

    const configured: string[] = this._config.preset_modes?.length ? this._config.preset_modes : [];
    // Visible: configured presets in config order; hidden: remaining available presets
    const visible = configured.filter((m) => available.includes(m));
    const hidden = available.filter((m) => !configured.includes(m));
    const displayList = [...visible, ...hidden];

    return html`
      <div class="preset-modes-editor">
        <div class="preset-modes-label">${localize('editor.preset_modes_list')}</div>
        ${repeat(
          displayList,
          (mode) => mode,
          (mode) => {
            const isVisible = visible.includes(mode);
            const visibleIndex = visible.indexOf(mode);
            return html`
              <div class="preset-mode-row">
                <ha-switch
                  .checked=${isVisible}
                  @change=${(ev) => this._presetModeToggle(mode, ev.target.checked, available, visible)}
                ></ha-switch>
                <span class="preset-mode-name">${mode}</span>
                <ha-icon-button
                  .disabled=${!isVisible || visibleIndex === 0}
                  @click=${() => isVisible && this._presetModeMove(mode, -1, visible)}
                >
                  <ha-svg-icon .path=${mdiArrowUp}></ha-svg-icon>
                </ha-icon-button>
                <ha-icon-button
                  .disabled=${!isVisible || visibleIndex === visible.length - 1}
                  @click=${() => isVisible && this._presetModeMove(mode, 1, visible)}
                >
                  <ha-svg-icon .path=${mdiArrowDown}></ha-svg-icon>
                </ha-icon-button>
              </div>
            `;
          },
        )}
      </div>
    `;
  }

  private _presetModeToggle(mode: string, checked: boolean, available: string[], visible: string[]): void {
    let newVisible: string[];
    if (checked) {
      newVisible = [...visible, mode];
    } else {
      newVisible = visible.filter((m) => m !== mode);
    }

    const newConfig = { ...this._config };
    // If all available presets are visible, remove the config key (use default behavior)
    if (
      !newVisible.length ||
      (newVisible.length === available.length && available.every((m) => newVisible.includes(m)))
    ) {
      delete newConfig.preset_modes;
    } else {
      newConfig.preset_modes = newVisible;
    }

    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _presetModeMove(mode: string, direction: -1 | 1, visible: string[]): void {
    const index = visible.indexOf(mode);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= visible.length) return;

    const newVisible = [...visible];
    [newVisible[index], newVisible[newIndex]] = [newVisible[newIndex], newVisible[index]];

    const newConfig = { ...this._config, preset_modes: newVisible };
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    const configValue = target.configValue;

    if (!configValue) {
      return;
    }

    let value;
    // Handle value-changed events (like ha-entity-picker)
    if (ev.detail && ev.detail.value !== undefined) {
      value = ev.detail.value;
    } else if (target.type === 'number') {
      value = Number(target.value);
    } else if (target.checked !== undefined) {
      value = target.checked;
    } else {
      value = target.value;
    }

    if (this._config[configValue] === value) {
      return;
    }

    const newConfig = { ...this._config };
    if (value === '' || value === undefined) {
      delete newConfig[configValue];
    } else {
      newConfig[configValue] = value;
    }

    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _getClimateEntities() {
    if (!this.hass) return [];

    return Object.keys(this.hass.states)
      .filter((eid) => eid.startsWith('climate.') || eid.startsWith('water_heater.'))
      .map((eid) => ({
        entity_id: eid,
        friendly_name: this.hass.states[eid].attributes.friendly_name || eid,
      }))
      .sort((a, b) => a.friendly_name.localeCompare(b.friendly_name));
  }

  private _getTempUnitMode(): string {
    const value = this._config.temp_unit;
    if (value === false) return 'hidden';
    if (typeof value === 'string') return 'custom'; // Any string (even empty) is custom mode
    return 'default';
  }

  private _tempUnitModeChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }

    const mode = ev.target.value;
    const newConfig = { ...this._config };

    if (mode === 'hidden') {
      newConfig.temp_unit = false;
    } else if (mode === 'default') {
      delete newConfig.temp_unit;
    } else if (mode === 'custom') {
      newConfig.temp_unit = '°C'; // Start with a default value
    }

    this._config = newConfig; // Update local state for re-render
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    ha-entity-picker,
    ha-textfield,
    ha-select {
      width: 100%;
    }
    ha-formfield {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }
    .preset-modes-editor {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 8px 12px;
    }
    .preset-modes-label {
      font-size: 0.9em;
      color: var(--secondary-text-color);
      padding: 4px 0 8px;
    }
    .preset-mode-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 2px 0;
    }
    .preset-mode-name {
      flex: 1;
    }
    ha-icon-button[disabled] {
      opacity: 0.3;
    }
  `;
}
