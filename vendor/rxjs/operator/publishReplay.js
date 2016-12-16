import { ReplaySubject } from '../ReplaySubject';
import { multicast } from './multicast';
/**
 * @owner Observable
 * @this {?}
 * @param {?=} bufferSize
 * @param {?=} windowTime
 * @param {?=} scheduler
 * @return {?}
 */
export function publishReplay(bufferSize = Number.POSITIVE_INFINITY, windowTime = Number.POSITIVE_INFINITY, scheduler) {
    return multicast.call(this, new ReplaySubject(bufferSize, windowTime, scheduler));
}
