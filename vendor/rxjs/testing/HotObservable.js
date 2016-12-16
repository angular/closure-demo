import { Subject } from '../Subject';
import { Subscription } from '../Subscription';
import { SubscriptionLoggable } from './SubscriptionLoggable';
import { applyMixins } from '../util/applyMixins';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class HotObservable extends Subject {
    /**
     * @param {?} messages
     * @param {?} scheduler
     */
    constructor(messages, scheduler) {
        super();
        this.messages = messages;
        this.subscriptions = [];
        this.scheduler = scheduler;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ subject = this;
        const /** @type {?} */ index = subject.logSubscribedFrame();
        subscriber.add(new Subscription(() => {
            subject.logUnsubscribedFrame(index);
        }));
        return super._subscribe(subscriber);
    }
    /**
     * @return {?}
     */
    setup() {
        const /** @type {?} */ subject = this;
        const /** @type {?} */ messagesLength = subject.messages.length;
        /* tslint:disable:no-var-keyword */
        for (var /** @type {?} */ i = 0; i < messagesLength; i++) {
            (() => {
                var /** @type {?} */ message = subject.messages[i];
                /* tslint:enable */
                subject.scheduler.schedule(() => { message.notification.observe(subject); }, message.frame);
            })();
        }
    }
}
function HotObservable_tsickle_Closure_declarations() {
    /** @type {?} */
    HotObservable.prototype.subscriptions;
    /** @type {?} */
    HotObservable.prototype.scheduler;
    /** @type {?} */
    HotObservable.prototype.logSubscribedFrame;
    /** @type {?} */
    HotObservable.prototype.logUnsubscribedFrame;
}
applyMixins(HotObservable, [SubscriptionLoggable]);
