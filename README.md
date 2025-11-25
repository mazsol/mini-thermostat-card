# Mini Thermostat Card by [@mazsol](https://www.github.com/mazsol)

The mini thermostat card for Home Assistant Lovelace

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)
[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

[![Community Forum][forum-shield]][forum]

## Support

Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](./assets/buymeacoffee-button.png)](https://www.buymeacoffee.com/zsoltj)

## Options

| Name                    | Type    | Requirement  | Description                                      | Default             |
| ----------------------- | ------- | ------------ | ------------------------------------------------ | ------------------- |
| type                    | string  | **Required** | `custom:mini-thermostat-card`                    |                     |
| entity                  | string  | **Required** | Climate entity ID                                | `none`              |
| name                    | string  | **Optional** | Card name (overrides entity friendly name)       | `Mini Thermostat Card` |
| layout                  | string  | **Optional** | Layout orientation (`row` or `col`)              | `row`               |
| temp_unit               | boolean/string | **Optional** | Temperature unit (true/false or custom)   | `true`              |
| step_size               | number  | **Optional** | Temperature adjustment step size                 | `1`                 |
| show_name               | boolean | **Optional** | Show card name                                   | `true`              |
| show_sensor_labels      | boolean | **Optional** | Show sensor's label                              | `false`             |
| show_related_entities   | boolean | **Optional** | Show related entities from same device           | `false`             |

[commits-shield]: https://img.shields.io/github/commit-activity/y/mazsol/mini-thermostat-card.svg?style=for-the-badge
[commits]: https://github.com/mazsol/mini-thermostat-card/commits/main
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/c/projects/frontend
[license-shield]: https://img.shields.io/github/license/mazsol/mini-thermostat-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/maintenance/yes/2025.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/mazsol/mini-thermostat-card.svg?style=for-the-badge
[releases]: https://github.com/mazsol/mini-thermostat-card/releases

