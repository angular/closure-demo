import { SubscriptionLog } from './SubscriptionLog';
export class SubscriptionLoggable {
    constructor() {
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    logSubscribedFrame() {
        this.subscriptions.push(new SubscriptionLog(this.scheduler.now()));
        return this.subscriptions.length - 1;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    logUnsubscribedFrame(index) {
        const /** @type {?} */ subscriptionLogs = this.subscriptions;
        const /** @type {?} */ oldSubscriptionLog = subscriptionLogs[index];
        subscriptionLogs[index] = new SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
    }
}
function SubscriptionLoggable_tsickle_Closure_declarations() {
    /** @type {?} */
    SubscriptionLoggable.prototype.subscriptions;
    /** @type {?} */
    SubscriptionLoggable.prototype.scheduler;
}
