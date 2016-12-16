import { AsyncAction } from './AsyncAction';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class QueueAction extends AsyncAction {
    /**
     * @param {?} scheduler
     * @param {?} work
     */
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    /**
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */
    schedule(state, delay = 0) {
        if (delay > 0) {
            return super.schedule(state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
    }
    /**
     * @param {?} state
     * @param {?} delay
     * @return {?}
     */
    execute(state, delay) {
        return (delay > 0 || this.closed) ?
            super.execute(state, delay) :
            this._execute(state, delay);
    }
    /**
     * @param {?} scheduler
     * @param {?=} id
     * @param {?=} delay
     * @return {?}
     */
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        return scheduler.flush(this);
    }
}
