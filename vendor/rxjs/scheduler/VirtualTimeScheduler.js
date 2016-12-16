import { AsyncAction } from './AsyncAction';
import { AsyncScheduler } from './AsyncScheduler';
export class VirtualTimeScheduler extends AsyncScheduler {
    /**
     * @param {?=} SchedulerAction
     * @param {?=} maxFrames
     */
    constructor(SchedulerAction = VirtualAction, maxFrames = Number.POSITIVE_INFINITY) {
        super(SchedulerAction, () => this.frame);
        this.maxFrames = maxFrames;
        this.frame = 0;
        this.index = -1;
    }
    /**
     * Prompt the Scheduler to execute all of its queued actions, therefore
     * clearing its queue.
     * @return {?}
     */
    flush() {
        const { actions, maxFrames } = this;
        let /** @type {?} */ error, /** @type {?} */ action;
        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        }
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}
VirtualTimeScheduler.frameTimeFactor = 10;
function VirtualTimeScheduler_tsickle_Closure_declarations() {
    /** @type {?} */
    VirtualTimeScheduler.prototype.frameTimeFactor;
    /** @type {?} */
    VirtualTimeScheduler.prototype.frame;
    /** @type {?} */
    VirtualTimeScheduler.prototype.index;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class VirtualAction extends AsyncAction {
    /**
     * @param {?} scheduler
     * @param {?} work
     * @param {?=} index
     */
    constructor(scheduler, work, index = scheduler.index += 1) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.index = index;
        this.index = scheduler.index = index;
    }
    /**
     * @param {?=} state
     * @param {?=} delay
     * @return {?}
     */
    schedule(state, delay = 0) {
        return !this.id ?
            super.schedule(state, delay) : ((
        // If an action is rescheduled, we save allocations by mutating its state,
        // pushing it to the end of the scheduler queue, and recycling the action.
        // But since the VirtualTimeScheduler is used for testing, VirtualActions
        // must be immutable so they can be inspected later.
        this.add(new VirtualAction(this.scheduler, this.work)))).schedule(state, delay);
    }
    /**
     * @param {?} scheduler
     * @param {?=} id
     * @param {?=} delay
     * @return {?}
     */
    requestAsyncId(scheduler, id, delay = 0) {
        this.delay = scheduler.frame + delay;
        const { actions } = scheduler;
        actions.push(this);
        actions.sort(VirtualAction.sortActions);
        return true;
    }
    /**
     * @param {?} scheduler
     * @param {?=} id
     * @param {?=} delay
     * @return {?}
     */
    recycleAsyncId(scheduler, id, delay = 0) {
        return undefined;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static sortActions(a, b) {
        if (a.delay === b.delay) {
            if (a.index === b.index) {
                return 0;
            }
            else if (a.index > b.index) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else if (a.delay > b.delay) {
            return 1;
        }
        else {
            return -1;
        }
    }
}
