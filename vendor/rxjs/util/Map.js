import { root } from './root';
import { MapPolyfill } from './MapPolyfill';
export const /** @type {?} */ Map = root.Map || (() => MapPolyfill)();
