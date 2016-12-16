import { SubscribeOnObservable } from '../observable/SubscribeOnObservable';
/**
 * Asynchronously subscribes Observers to this Observable on the specified Scheduler.
 *
 * <img src="./img/subscribeOn.png" width="100%">
 *
 * .
 * @owner Observable
 * @this {?}
 * @param {?} scheduler
 * @param {?=} delay
 * @return {?}
 */
export function subscribeOn(scheduler, delay = 0) {
    return this.lift(new SubscribeOnOperator(scheduler, delay));
}
class SubscribeOnOperator {
    /**
     * @param {?} scheduler
     * @param {?} delay
     */
    constructor(scheduler, delay) {
        this.scheduler = scheduler;
        this.delay = delay;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return new SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
    }
}
