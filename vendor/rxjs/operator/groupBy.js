import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { Observable } from '../Observable';
import { Subject } from '../Subject';
import { Map } from '../util/Map';
import { FastMap } from '../util/FastMap';
/**
 * Groups the items emitted by an Observable according to a specified criterion,
 * and emits these grouped items as `GroupedObservables`, one
 * {\@link GroupedObservable} per group.
 *
 * <img src="./img/groupBy.png" width="100%">
 *
 * for each item.
 * return element for each item.
 * a function that returns an Observable to determine how long each group should
 * exist.
 * GroupedObservables, each of which corresponds to a unique key value and each
 * of which emits those items from the source Observable that share that key
 * value.
 * @owner Observable
 * @this {?}
 * @param {?} keySelector
 * @param {?=} elementSelector
 * @param {?=} durationSelector
 * @param {?=} subjectSelector
 * @return {?}
 */
export function groupBy(keySelector, elementSelector, durationSelector, subjectSelector) {
    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
}
class GroupByOperator {
    /**
     * @param {?} keySelector
     * @param {?=} elementSelector
     * @param {?=} durationSelector
     * @param {?=} subjectSelector
     */
    constructor(keySelector, elementSelector, durationSelector, subjectSelector) {
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class GroupBySubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} keySelector
     * @param {?=} elementSelector
     * @param {?=} durationSelector
     * @param {?=} subjectSelector
     */
    constructor(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
        super(destination);
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.subjectSelector = subjectSelector;
        this.groups = null;
        this.attemptedToUnsubscribe = false;
        this.count = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ key;
        try {
            key = this.keySelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this._group(value, key);
    }
    /**
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    _group(value, key) {
        let /** @type {?} */ groups = this.groups;
        if (!groups) {
            groups = this.groups = typeof key === 'string' ? new FastMap() : new Map();
        }
        let /** @type {?} */ group = groups.get(key);
        let /** @type {?} */ element;
        if (this.elementSelector) {
            try {
                element = this.elementSelector(value);
            }
            catch (err) {
                this.error(err);
            }
        }
        else {
            element = (value);
        }
        if (!group) {
            group = this.subjectSelector ? this.subjectSelector() : new Subject();
            groups.set(key, group);
            const /** @type {?} */ groupedObservable = new GroupedObservable(key, group, this);
            this.destination.next(groupedObservable);
            if (this.durationSelector) {
                let /** @type {?} */ duration;
                try {
                    duration = this.durationSelector(new GroupedObservable(key, /** @type {?} */ (group)));
                }
                catch (err) {
                    this.error(err);
                    return;
                }
                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
            }
        }
        if (!group.closed) {
            group.next(element);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ groups = this.groups;
        if (groups) {
            groups.forEach((group, key) => {
                group.error(err);
            });
            groups.clear();
        }
        this.destination.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ groups = this.groups;
        if (groups) {
            groups.forEach((group, key) => {
                group.complete();
            });
            groups.clear();
        }
        this.destination.complete();
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeGroup(key) {
        this.groups.delete(key);
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        if (!this.closed && !this.attemptedToUnsubscribe) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                super.unsubscribe();
            }
        }
    }
}
function GroupBySubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    GroupBySubscriber.prototype.groups;
    /** @type {?} */
    GroupBySubscriber.prototype.attemptedToUnsubscribe;
    /** @type {?} */
    GroupBySubscriber.prototype.count;
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class GroupDurationSubscriber extends Subscriber {
    /**
     * @param {?} key
     * @param {?} group
     * @param {?} parent
     */
    constructor(key, group, parent) {
        super();
        this.key = key;
        this.group = group;
        this.parent = parent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this._complete();
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ group = this.group;
        if (!group.closed) {
            group.error(err);
        }
        this.parent.removeGroup(this.key);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ group = this.group;
        if (!group.closed) {
            group.complete();
        }
        this.parent.removeGroup(this.key);
    }
}
/**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
 * Observable. The common key is available as the field `key` on a
 * GroupedObservable instance.
 *
 */
export class GroupedObservable extends Observable {
    /**
     * @param {?} key
     * @param {?} groupSubject
     * @param {?=} refCountSubscription
     */
    constructor(key, groupSubject, refCountSubscription) {
        super();
        this.key = key;
        this.groupSubject = groupSubject;
        this.refCountSubscription = refCountSubscription;
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const /** @type {?} */ subscription = new Subscription();
        const { refCountSubscription, groupSubject } = this;
        if (refCountSubscription && !refCountSubscription.closed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class InnerRefCountSubscription extends Subscription {
    /**
     * @param {?} parent
     */
    constructor(parent) {
        super();
        this.parent = parent;
        parent.count++;
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        const /** @type {?} */ parent = this.parent;
        if (!parent.closed && !this.closed) {
            super.unsubscribe();
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    }
}
