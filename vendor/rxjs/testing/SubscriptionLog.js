export class SubscriptionLog {
    /**
     * @param {?} subscribedFrame
     * @param {?=} unsubscribedFrame
     */
    constructor(subscribedFrame, unsubscribedFrame = Number.POSITIVE_INFINITY) {
        this.subscribedFrame = subscribedFrame;
        this.unsubscribedFrame = unsubscribedFrame;
    }
}
