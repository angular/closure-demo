import { Subscription } from '../Subscription';
import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
/**
 * Buffers the source Observable values starting from an emission from
 * `openings` and ending when the output of `closingSelector` emits.
 *
 * <span class="informal">Collects values from the past as an array. Starts
 * collecting only when `opening` emits, and calls the `closingSelector`
 * function to get an Observable that tells when to close the buffer.</span>
 *
 * <img src="./img/bufferToggle.png" width="100%">
 *
 * Buffers values from the source by opening the buffer via signals from an
 * Observable provided to `openings`, and closing and sending the buffers when
 * a Subscribable or Promise returned by the `closingSelector` function emits.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var openings = Rx.Observable.interval(1000);
 * var buffered = clicks.bufferToggle(openings, i =>
 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
 * );
 * buffered.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 * @see {\@link bufferTime}
 * @see {\@link bufferWhen}
 * @see {\@link windowToggle}
 *
 * buffers.
 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
 * which, when it emits, signals that the associated buffer should be emitted
 * and cleared.
 * @owner Observable
 * @this {?}
 * @param {?} openings
 * @param {?} closingSelector
 * @return {?}
 */
export function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}
class BufferToggleOperator {
    /**
     * @param {?} openings
     * @param {?} closingSelector
     */
    constructor(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class BufferToggleSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} openings
     * @param {?} closingSelector
     */
    constructor(destination, openings, closingSelector) {
        super(destination);
        this.openings = openings;
        this.closingSelector = closingSelector;
        this.contexts = [];
        this.add(subscribeToResult(this, openings));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        const /** @type {?} */ contexts = this.contexts;
        const /** @type {?} */ len = contexts.length;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ contexts = this.contexts;
        while (contexts.length > 0) {
            const /** @type {?} */ context = contexts.shift();
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        super._error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ contexts = this.contexts;
        while (contexts.length > 0) {
            const /** @type {?} */ context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        super._complete();
    }
    /**
     * @param {?} outerValue
     * @param {?} innerValue
     * @param {?} outerIndex
     * @param {?} innerIndex
     * @param {?} innerSub
     * @return {?}
     */
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.closeBuffer(((innerSub)).context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    openBuffer(value) {
        try {
            const /** @type {?} */ closingSelector = this.closingSelector;
            const /** @type {?} */ closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    closeBuffer(context) {
        const /** @type {?} */ contexts = this.contexts;
        if (contexts && context) {
            const { buffer, subscription } = context;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    }
    /**
     * @param {?} closingNotifier
     * @return {?}
     */
    trySubscribe(closingNotifier) {
        const /** @type {?} */ contexts = this.contexts;
        const /** @type {?} */ buffer = [];
        const /** @type {?} */ subscription = new Subscription();
        const /** @type {?} */ context = { buffer, subscription };
        contexts.push(context);
        const /** @type {?} */ innerSubscription = subscribeToResult(this, closingNotifier, /** @type {?} */ (context));
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        }
        else {
            ((innerSubscription)).context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    }
}
function BufferToggleSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    BufferToggleSubscriber.prototype.contexts;
}
