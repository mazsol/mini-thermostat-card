/**
 * Imported from Home Assistant frontend codebase.
 * Source: https://github.com/home-assistant/frontend/blob/dev/src/common/dom/fire_event.ts
 * Date: 2026-01-03
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const fireEvent = (
  node: HTMLElement,
  type: string,
  detail?: any,
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  },
) => {
  const event = new Event(type, {
    bubbles: options?.bubbles ?? true,
    cancelable: options?.cancelable ?? true,
    composed: options?.composed ?? true,
  });
  (event as any).detail = detail;
  node.dispatchEvent(event);
  return event;
};
