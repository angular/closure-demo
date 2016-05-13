goog.module('rxjs$operator$share');
var multicast_1 = goog.require('rxjs$operator$multicast');
var Subject_1 = goog.require('rxjs$Subject');
/**
 * @return {?}
 */
function shareSubjectFactory() {
    return new Subject_1.Subject();
}
/**
 *  Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`. This is an alias for .publish().refCount(). * <img src="./img/share.png" width="100%"> *
 * @method share
 * @owner Observable
 * @return {?}
 */
function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
}
exports.share = share;
;
