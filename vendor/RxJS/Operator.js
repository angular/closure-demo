goog.module('rxjs$Operator');
var Subscriber_1 = goog.require('rxjs$Subscriber');
class Operator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new Subscriber_1.Subscriber(subscriber));
    }
}
exports.Operator = Operator;
