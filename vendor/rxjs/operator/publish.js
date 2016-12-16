import { Subject } from '../Subject';
import { multicast } from './multicast';
/**
 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
 * before it begins emitting items to those Observers that have subscribed to it.
 *
 * <img src="./img/publish.png" width="100%">
 *
 * without causing multiple subscriptions to the source sequence.
 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
 * @owner Observable
 * @this {?}
 * @param {?=} selector
 * @return {?} a ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
 */
export function publish(selector) {
    return selector ? multicast.call(this, () => new Subject(), selector) :
        multicast.call(this, new Subject());
}
