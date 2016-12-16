import { BehaviorSubject } from '../BehaviorSubject';
import { multicast } from './multicast';
/**
 * @owner Observable
 * @this {?}
 * @param {?} value
 * @return {?}
 */
export function publishBehavior(value) {
    return multicast.call(this, new BehaviorSubject(value));
}
