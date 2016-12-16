/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an {\@link Action}.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 */
export class Scheduler {
    /**
     * @param {?} SchedulerAction
     * @param {?=} now
     */
    constructor(SchedulerAction, now = Scheduler.now) {
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * task, or some unit of work to be executed by the Scheduler.
     * time unit is implicit and defined by the Scheduler itself.
     * called by the Scheduler.
     * the scheduled work.
     * @param {?} work
     * @param {?=} delay
     * @param {?=} state
     * @return {?}
     */
    schedule(work, delay = 0, state) {
        return new this.SchedulerAction(this, work).schedule(state, delay);
    }
}
Scheduler.now = Date.now ? Date.now : () => +new Date();
function Scheduler_tsickle_Closure_declarations() {
    /** @type {?} */
    Scheduler.prototype.now;
    /**
     * A getter method that returns a number representing the current time
     * (at the time this function was called) according to the scheduler's own
     * internal clock.
     * have a relation to wall-clock time. May or may not refer to a time unit
     * (e.g. milliseconds).
     * @type {?}
     */
    Scheduler.prototype.now;
}
