import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
import { SubscriptionLoggable } from './SubscriptionLoggable';
import { applyMixins } from '../util/applyMixins';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class ColdObservable extends Observable {
    /**
     * @param {?} messages
     * @param {?} scheduler
     */
    constructor(messages, scheduler) {
        super(function (subscriber) {
            const observable = this;
            const index = observable.logSubscribedFrame();
            subscriber.add(new Subscription(() => {
                observable.logUnsubscribedFrame(index);
            }));
            observable.scheduleMessages(subscriber);
            return subscriber;
        });
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    scheduleMessages(subscriber) {
        const /** @type {?} */ messagesLength = this.messages.length;
        for (let /** @type {?} */ i = 0; i < messagesLength; i++) {
            const /** @type {?} */ message = this.messages[i];
            subscriber.add(this.scheduler.schedule(({ message, subscriber }) => { message.notification.observe(subscriber); }, message.frame, { message, subscriber }));
        }
    }
}
function ColdObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    ColdObservable.prototype.subscriptions;
    /** @type {?} */
    ColdObservable.prototype.scheduler;
    /** @type {?} */
    ColdObservable.prototype.logSubscribedFrame;
    /** @type {?} */
    ColdObservable.prototype.logUnsubscribedFrame;
}
applyMixins(ColdObservable, [SubscriptionLoggable]);
