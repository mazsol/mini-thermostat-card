// Example Minimal TypeScript Card using LitElement
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HomeAssistant } from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

interface MiniThermostatCardConfig {
  entity: string;
  name?: string;
}

@customElement('mini-thermostat-card')
export class MiniThermostatCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Object }) public config!: MiniThermostatCardConfig;

  // Called when the configuration changes
  public setConfig(config: MiniThermostatCardConfig): void {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }
    this.config = config;
  }

  // Returns the height of your card for dashboard layout
  public getCardSize(): number {
    return 3; // Example: 3 units tall
  }

  // Render the card content
  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    const stateObj = this.hass.states[this.config.entity];

    if (!stateObj) {
      return html`<div class="not-found">Entity not found: ${this.config.entity}</div>`;
    }

    return html`
      <ha-card header="${ifDefined(this.config.name || stateObj.attributes.friendly_name)}">
        <div class="card-content">
          The current state of ${this.config.entity} is: ${stateObj.state}
        </div>
      </ha-card>
    `;
  }
}