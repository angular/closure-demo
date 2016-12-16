import { connectableObservableDescriptor } from '../observable/ConnectableObservable';
/**
 * Returns an Observable that emits the results of invoking a specified selector on items
 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
 *
 * <img src="./img/multicast.png" width="100%">
 *
 * which the source sequence's elements will be multicast to the selector function
 * or Subject to push source elements into.
 * as many times as needed, without causing multiple subscriptions to the source stream.
 * Subscribers to the given source will receive all notifications of the source from the
 * time of the subscription forward.
 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
 * the underlying stream.
 * @owner Observable
 * @this {?}
 * @param {?} subjectOrSubjectFactory
 * @param {?=} selector
 * @return {?}
 */
export function multicast(subjectOrSubjectFactory, selector) {
    let /** @type {?} */ subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
        subjectFactory = (subjectOrSubjectFactory);
    }
    else {
        subjectFactory = function subjectFactory() {
            return (subjectOrSubjectFactory);
        };
    }
    if (typeof selector === 'function') {
        return this.lift(new MulticastOperator(subjectFactory, selector));
    }
    const /** @type {?} */ connectable = Object.create(this, connectableObservableDescriptor);
    connectable.source = this;
    connectable.subjectFactory = subjectFactory;
    return (connectable);
}
export class MulticastOperator {
    /**
     * @param {?} subjectFactory
     * @param {?} selector
     */
    constructor(subjectFactory, selector) {
        this.subjectFactory = subjectFactory;
        this.selector = selector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        const { selector } = this;
        const /** @type {?} */ subject = this.subjectFactory();
        const /** @type {?} */ subscription = selector(subject).subscribe(subscriber);
        subscription.add(source.subscribe(subject));
        return subscription;
    }
}
