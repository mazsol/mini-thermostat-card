/**
 * Imported from Home Assistant frontend codebase.
 * Source: https://github.com/home-assistant/frontend/blob/dev/src/common/entity/compute_domain.ts
 * Date: 2026-01-01
 */
export const computeDomain = (entityId: string): string => entityId.substring(0, entityId.indexOf('.'));
