import { Observable } from '../Observable';
import { isScheduler } from '../util/isScheduler';
const /** @type {?} */ selfSelector = (value) => value;
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class GenerateObservable extends Observable {
    /**
     * @param {?} initialState
     * @param {?} condition
     * @param {?} iterate
     * @param {?} resultSelector
     * @param {?=} scheduler
     */
    constructor(initialState, condition, iterate, resultSelector, scheduler) {
        super();
        this.initialState = initialState;
        this.condition = condition;
        this.iterate = iterate;
        this.resultSelector = resultSelector;
        this.scheduler = scheduler;
    }
    /**
     * @param {?} initialStateOrOptions
     * @param {?=} condition
     * @param {?=} iterate
     * @param {?=} resultSelectorOrObservable
     * @param {?=} scheduler
     * @return {?}
     */
    static create(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
        if (arguments.length == 1) {
            return new GenerateObservable(((initialStateOrOptions)).initialState, ((initialStateOrOptions)).condition, ((initialStateOrOptions)).iterate, ((initialStateOrOptions)).resultSelector || selfSelector, ((initialStateOrOptions)).scheduler);
        }
        if (resultSelectorOrObservable === undefined || isScheduler(resultSelectorOrObservable)) {
            return new GenerateObservable(/** @type {?} */ (initialStateOrOptions), condition, iterate, selfSelector, /** @type {?} */ (resultSelectorOrObservable));
        }
        return new GenerateObservable(/** @type {?} */ (initialStateOrOptions), condition, iterate, /** @type {?} */ (resultSelectorOrObservable), /** @type {?} */ (scheduler));
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        let /** @type {?} */ state = this.initialState;
        if (this.scheduler) {
            return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
                subscriber,
                iterate: this.iterate,
                condition: this.condition,
                resultSelector: this.resultSelector,
                state
            });
        }
        const { condition, resultSelector, iterate } = this;
        do {
            if (condition) {
                let /** @type {?} */ conditionResult;
                try {
                    conditionResult = condition(state);
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (!conditionResult) {
                    subscriber.complete();
                    break;
                }
            }
            let /** @type {?} */ value;
            try {
                value = resultSelector(state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
            subscriber.next(value);
            if (subscriber.closed) {
                break;
            }
            try {
                state = iterate(state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
        } while (true);
    }
    /**
     * @param {?} state
     * @return {?}
     */
    static dispatch(state) {
        const { subscriber, condition } = state;
        if (subscriber.closed) {
            return;
        }
        if (state.needIterate) {
            try {
                state.state = state.iterate(state.state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
        }
        else {
            state.needIterate = true;
        }
        if (condition) {
            let /** @type {?} */ conditionResult;
            try {
                conditionResult = condition(state.state);
            }
            catch (err) {
                subscriber.error(err);
                return;
            }
            if (!conditionResult) {
                subscriber.complete();
                return;
            }
            if (subscriber.closed) {
                return;
            }
        }
        let /** @type {?} */ value;
        try {
            value = state.resultSelector(state.state);
        }
        catch (err) {
            subscriber.error(err);
            return;
        }
        if (subscriber.closed) {
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        return (((this))).schedule(state);
    }
}
