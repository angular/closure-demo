import { Observable } from '../Observable';
import { asap } from '../scheduler/asap';
import { isNumeric } from '../util/isNumeric';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class SubscribeOnObservable extends Observable {
    /**
     * @param {?} source
     * @param {?=} delayTime
     * @param {?=} scheduler
     */
    constructor(source, delayTime = 0, scheduler = asap) {
        super();
        this.source = source;
        this.delayTime = delayTime;
        this.scheduler = scheduler;
        if (!isNumeric(delayTime) || delayTime < 0) {
            this.delayTime = 0;
        }
        if (!scheduler || typeof scheduler.schedule !== 'function') {
            this.scheduler = asap;
        }
    }
    /**
     * @param {?} source
     * @param {?=} delay
     * @param {?=} scheduler
     * @return {?}
     */
    static create(source, delay = 0, scheduler = asap) {
        return new SubscribeOnObservable(source, delay, scheduler);
    }
    /**
     * @this {?}
     * @param {?} arg
     * @return {?}
     */
    static dispatch(arg) {
        const { source, subscriber } = arg;
        return this.add(source.subscribe(subscriber));
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ delay = this.delayTime;
        const /** @type {?} */ source = this.source;
        const /** @type {?} */ scheduler = this.scheduler;
        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
            source, subscriber
        });
    }
}
