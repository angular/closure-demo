import { Subscription } from '../Subscription';
/**
 * A unit of work to be executed in a {\@link Scheduler}. An action is typically
 * created from within a Scheduler and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 */
export class Action extends Subscription {
    /**
     * @param {?} scheduler
     * @param {?} work
     */
    constructor(scheduler, work) {
        super();
    }
    /**
     * Schedules this action on its parent Scheduler for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * called by the Scheduler.
     * time unit is implicit and defined by the Scheduler.
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */
    schedule(state, delay = 0) {
        return this;
    }
}
