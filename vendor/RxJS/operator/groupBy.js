goog.module('rxjs$operator$groupBy');
var Subscriber_1 = goog.require('rxjs$Subscriber');
var Subscription_1 = goog.require('rxjs$Subscription');
var Observable_1 = goog.require('rxjs$Observable');
var Subject_1 = goog.require('rxjs$Subject');
var Map_1 = goog.require('rxjs$util$Map');
var FastMap_1 = goog.require('rxjs$util$FastMap');
/**
 *  Groups the items emitted by an Observable according to a specified criterion, and emits these grouped items as `GroupedObservables`, one {@link GroupedObservable} per group. * <img src="./img/groupBy.png" width="100%"> * for each item. return element for each item. a function that returns an Observable to determine how long each group should exist. GroupedObservables, each of which corresponds to a unique key value and each of which emits those items from the source Observable that share that key value.
 * @method groupBy
 * @owner Observable
 * @param {?} keySelector
 * @param {?=} elementSelector
 * @param {?=} durationSelector
 * @return {?}
 */
function groupBy(keySelector, elementSelector, durationSelector) {
    return this.lift(new GroupByOperator(this, keySelector, elementSelector, durationSelector));
}
exports.groupBy = groupBy;
class GroupByOperator {
    /**
     * @param {?} source
     * @param {?} keySelector
     * @param {?=} elementSelector
     * @param {?=} durationSelector
     */
    constructor(source, keySelector, elementSelector, durationSelector) {
        this.source = source;
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source._subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector));
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        GroupByOperator.prototype.source;
        /** @type {?} */
        GroupByOperator.prototype.keySelector;
        /** @type {?} */
        GroupByOperator.prototype.elementSelector;
        /** @type {?} */
        GroupByOperator.prototype.durationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class GroupBySubscriber extends Subscriber_1.Subscriber {
    /**
     * @param {?} destination
     * @param {?} keySelector
     * @param {?=} elementSelector
     * @param {?=} durationSelector
     */
    constructor(destination, keySelector, elementSelector, durationSelector) {
        super();
        this.keySelector = keySelector;
        this.elementSelector = elementSelector;
        this.durationSelector = durationSelector;
        this.groups = null;
        this.attemptedToUnsubscribe = false;
        this.count = 0;
        this.destination = destination;
        this.add(destination);
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
            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
        }
        let /** @type {?} */ group = groups.get(key);
        if (!group) {
            groups.set(key, group = new Subject_1.Subject());
            const /** @type {?} */ groupedObservable = new GroupedObservable(key, group, this);
            if (this.durationSelector) {
                this._selectDuration(key, group);
            }
            this.destination.next(groupedObservable);
        }
        if (this.elementSelector) {
            this._selectElement(value, group);
        }
        else {
            this.tryGroupNext(value, group);
        }
    }
    /**
     * @param {?} value
     * @param {?} group
     * @return {?}
     */
    _selectElement(value, group) {
        let /** @type {?} */ result;
        try {
            result = this.elementSelector(value);
        }
        catch (err) {
            this.error(err);
            return;
        }
        this.tryGroupNext(result, group);
    }
    /**
     * @param {?} key
     * @param {?} group
     * @return {?}
     */
    _selectDuration(key, group) {
        let /** @type {?} */ duration;
        try {
            duration = this.durationSelector(new GroupedObservable(key, group));
        }
        catch (err) {
            this.error(err);
            return;
        }
        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
    }
    /**
     * @param {?} value
     * @param {?} group
     * @return {?}
     */
    tryGroupNext(value, group) {
        if (!group.isUnsubscribed) {
            group.next(value);
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
        if (!this.isUnsubscribed && !this.attemptedToUnsubscribe) {
            this.attemptedToUnsubscribe = true;
            if (this.count === 0) {
                super.unsubscribe();
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        GroupBySubscriber.prototype.groups;
        /** @type {?} */
        GroupBySubscriber.prototype.attemptedToUnsubscribe;
        /** @type {?} */
        GroupBySubscriber.prototype.count;
        /** @type {?} */
        GroupBySubscriber.prototype.keySelector;
        /** @type {?} */
        GroupBySubscriber.prototype.elementSelector;
        /** @type {?} */
        GroupBySubscriber.prototype.durationSelector;
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class GroupDurationSubscriber extends Subscriber_1.Subscriber {
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
        this.tryComplete();
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.tryError(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.tryComplete();
    }
    /**
     * @param {?} err
     * @return {?}
     */
    tryError(err) {
        const /** @type {?} */ group = this.group;
        if (!group.isUnsubscribed) {
            group.error(err);
        }
        this.parent.removeGroup(this.key);
    }
    /**
     * @return {?}
     */
    tryComplete() {
        const /** @type {?} */ group = this.group;
        if (!group.isUnsubscribed) {
            group.complete();
        }
        this.parent.removeGroup(this.key);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        GroupDurationSubscriber.prototype.key;
        /** @type {?} */
        GroupDurationSubscriber.prototype.group;
        /** @type {?} */
        GroupDurationSubscriber.prototype.parent;
    }
}
/**
 * An Observable representing values belonging to the same group represented by
 * a common key. The values emitted by a GroupedObservable come from the source
 * Observable. The common key is available as the field `key` on a
 * GroupedObservable instance.
 *
 * @class GroupedObservable<K, T>
 */
class GroupedObservable extends Observable_1.Observable {
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
        const /** @type {?} */ subscription = new Subscription_1.Subscription();
        const { refCountSubscription, groupSubject } = this;
        if (refCountSubscription && !refCountSubscription.isUnsubscribed) {
            subscription.add(new InnerRefCountSubscription(refCountSubscription));
        }
        subscription.add(groupSubject.subscribe(subscriber));
        return subscription;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        GroupedObservable.prototype.key;
        /** @type {?} */
        GroupedObservable.prototype.groupSubject;
        /** @type {?} */
        GroupedObservable.prototype.refCountSubscription;
    }
}
exports.GroupedObservable = GroupedObservable;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class InnerRefCountSubscription extends Subscription_1.Subscription {
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
        if (!parent.isUnsubscribed && !this.isUnsubscribed) {
            super.unsubscribe();
            parent.count -= 1;
            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
                parent.unsubscribe();
            }
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InnerRefCountSubscription.prototype.parent;
    }
}
