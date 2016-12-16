import { Subscriber } from '../Subscriber';
import { $$rxSubscriber } from '../symbol/rxSubscriber';
import { empty as emptyObserver } from '../Observer';
/**
 * @param {?=} nextOrObserver
 * @param {?=} error
 * @param {?=} complete
 * @return {?}
 */
export function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber) {
            return ((nextOrObserver));
        }
        if (nextOrObserver[$$rxSubscriber]) {
            return nextOrObserver[$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber(emptyObserver);
    }
    return new Subscriber(nextOrObserver, error, complete);
}
