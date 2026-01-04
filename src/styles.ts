import { css } from 'lit';

export const MINI_THERMOSTAT_CARD_STYLE = css`
  .auto {
    --hvac-mode-color: var(--state-climate-auto-color);
  }
  .cool {
    --hvac-mode-color: var(--state-climate-cool-color);
  }
  .dry {
    --hvac-mode-color: var(--state-climate-dry-color);
  }
  .eco {
    --hvac-mode-color: var(--state-climate-eco-color);
  }
  .fan_only {
    --hvac-mode-color: var(--state-climate-fan_only-color);
  }
  .heat {
    --hvac-mode-color: var(--state-climate-heat-color);
  }
  .idle {
    --hvac-mode-color: var(--state-climate-idle-color);
  }
  .manual {
    --hvac-mode-color: var(--state-climate-manual-color);
  }
  .off {
    --hvac-mode-color: var(--state-climate-off-color);
  }
  ha-card {
    -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
    font-size: var(--paper-font-body1_-_font-size);
    font-weight: var(--paper-font-body1_-_font-weight);
    line-height: var(--paper-font-body1_-_line-height);
    padding-bottom: calc(var(--st-spacing, var(--st-default-spacing)) * 2);
    overflow: hidden;
    --auto-color: green;
    --heat_cool-color: springgreen;
    --cool-color: #2b9af9;
    --heat-color: #ff8100;
    --manual-color: #44739e;
    --off-color: #8a8a8a;
    --fan_only-color: #8a8a8a;
    --dry-color: #efbd07;
    --st-default-spacing: 4px;
    --name-font-size: 1.2rem;
    --st-font-size-sensors: 1rem;

    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 24px;
  }
  ha-control-select-menu {
    width: 140px;
  }
  #tempControls {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
  }
  #hvac-modes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--disabled-text-color);
  }
  #hvac-modes .selected-mode {
    color: var(--hvac-mode-color);
  }
  #preset-modes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--disabled-text-color);
  }
  #preset-modes .selected-mode {
    color: var(--hvac-mode-color);
  }
  #fan-modes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--disabled-text-color);
  }
  #fan-modes .selected-mode {
    color: var(--hvac-mode-color);
  }
  #swing-modes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--disabled-text-color);
  }
  #swing-modes .selected-mode {
    color: var(--hvac-mode-color);
  }
  #relatedEntities {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: var(--disabled-text-color);
  }
  #relatedEntities .active-state {
    color: var(--hvac-mode-color);
  }
  #dropdown-modes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    margin: 5px;
  }

  .debug-info {
    font-size: 0.7rem;
    color: gray;
    margin-bottom: 2px;
    text-align: center;
  }

  .hvac-auto {
    color: var(--state-climate-auto-color);
  }
  .hvac-cool {
    color: var(--state-climate-cool-color);
  }
  .hvac-dry {
    color: var(--state-climate-dry-color);
  }
  .hvac-eco {
    color: var(--state-climate-eco-color);
  }
  .hvac-fan_only {
    color: var(--state-climate-fan_only-color);
  }
  .hvac-heat {
    color: var(--state-climate-heat-color);
  }
  .hvac-idle {
    color: var(--state-climate-idle-color);
  }
  .hvac-manual {
    color: var(--state-climate-manual-color);
  }
  .hvac-off {
    color: var(--state-climate-off-color);
  }

  .sensors {
    font-size: var(--st-font-size-sensors, var(--paper-font-subhead_-_font-size));
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0;
    overflow: hidden;
  }
  .sensor-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    min-width: 0; /* Allow flex children to shrink below content size */
    overflow: hidden;
  }
  .card-title {
    grid-column: 1 / 3;
    text-align: center;
    font-size: var(--name-font-size);
    font-weight: 500;
    border-bottom: 1px solid var(--hvac-mode-color);
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
  }
  .sensor-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    line-height: 1.2;
    padding: 2px 5px;
  }
  .sensor-header {
    padding-left: 0px;
  }
  .sensor-value {
    padding-left: 0px;
  }
  .temp-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    border: 1px solid var(--hvac-mode-color);
    border-radius: 10px;
  }
  .temp-control.row {
    flex-direction: row-reverse;
    flex-wrap: wrap;
    width: 45%;
  }
  .temp-control.col {
    flex-direction: column;
    width: 45%;
  }
  div.current-value {
    display: flex;
    font-weight: 400;
    align-items: flex-start;
  }
  h3.current-value {
    display: flex;
    align-items: center;
    margin: 0;
    line-height: 30px;
    font-size: 30px;
    font-weight: 400;
  }
  h3.current-value.updating {
    color: var(--error-color);
  }
  span.temp-unit {
    font-size: 18px;
    line-height: 18px;
  }

  /* Very large cards (9+ columns, wide screens) */
  @media (min-width: 1281px) {
    .temp-control.row {
      width: 65%;
    }
    .temp-control.col {
      width: 45%;
    }
  }

  /* Extra large screen sizes */
  @media (max-width: 1280px) {
    h3.current-value {
      font-size: 24px;
      font-weight: var(--ha_font_weight-medium, 500);
      line-height: 24px;
    }
    span.temp-unit {
      font-size: 16px;
      line-height: 16px;
    }
    .temp-control.row {
      width: 67%;
    }
    .temp-control.col {
      width: 35%;
    }
  }

  /* Large screen sizes */
  @media (max-width: 1024px) {
    h3.current-value {
      font-size: 24px;
      font-weight: var(--ha_font_weight-medium, 500);
      line-height: 24px;
    }
    span.temp-unit {
      font-size: 16px;
      line-height: 16px;
    }
    .temp-control.row {
      width: 67%;
    }
    .temp-control.col {
      width: 35%;
    }
  }

  /* Medium screen sizes */
  @media (max-width: 768px) {
    h3.current-value {
      font-size: 24px;
      font-weight: var(--ha_font_weight-medium, 500);
      line-height: 24px;
    }
    span.temp-unit {
      font-size: 16px;
      line-height: 16px;
    }
    .temp-control.row {
      width: 50%;
    }
    .temp-control.col {
      width: 30%;
    }
  }

  /* Small screen sizes */
  @media (max-width: 480px) {
    h3.current-value {
      font-size: 30px;
      font-weight: var(--ha_font_weight-medium, 500);
      line-height: 30px;
    }
    span.temp-unit {
      font-size: 20px;
      line-height: 20px;
    }
    .temp-control.row {
      width: 70%;
    }
    .temp-control.col {
      width: 40%;
    }
  }

  /* Extra Small screen sizes */
  @media (max-width: 360px) {
    h3.current-value {
      font-size: 30px;
      font-weight: var(--ha_font_weight-medium, 500);
      line-height: 30px;
    }
    span.temp-unit {
      font-size: 20px;
      line-height: 20px;
    }
    .temp-control.row {
      width: 75%;
    }
    .temp-control.col {
      width: 45%;
    }
  }
`;
