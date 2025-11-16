import { HomeAssistant as HomeAssistantBase } from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

export interface EntityRegistryEntry {
  entity_id: string;
  platform: string;
  device_id?: string;
  entity_category?: string;
  name?: string;
  translation_key?: string;
}

export interface HomeAssistant extends HomeAssistantBase {
  entities: {
    [entity_id: string]: EntityRegistryEntry;
  };
}
