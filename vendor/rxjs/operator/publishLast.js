import { AsyncSubject } from '../AsyncSubject';
import { multicast } from './multicast';
/**
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function publishLast() {
    return multicast.call(this, new AsyncSubject());
}
