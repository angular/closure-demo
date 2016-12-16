import { FromObservable } from '../observable/FromObservable';
import { isArray } from '../util/isArray';
import { OuterSubscriber } from '../OuterSubscriber';
import { subscribeToResult } from '../util/subscribeToResult';
/**
 * @this {?}
 * @param {...?} nextSources
 * @return {?}
 */
export function onErrorResumeNext(...nextSources) {
    if (nextSources.length === 1 && isArray(nextSources[0])) {
        nextSources = (nextSources[0]);
    }
    return this.lift(new OnErrorResumeNextOperator(nextSources));
}
/**
 * @param {...?} nextSources
 * @return {?}
 */
export function onErrorResumeNextStatic(...nextSources) {
    let /** @type {?} */ source = null;
    if (nextSources.length === 1 && isArray(nextSources[0])) {
        nextSources = (nextSources[0]);
    }
    source = nextSources.shift();
    return new FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
}
class OnErrorResumeNextOperator {
    /**
     * @param {?} nextSources
     */
    constructor(nextSources) {
        this.nextSources = nextSources;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
    }
}
class OnErrorResumeNextSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} nextSources
     */
    constructor(destination, nextSources) {
        super(destination);
        this.destination = destination;
        this.nextSources = nextSources;
    }
    /**
     * @param {?} error
     * @param {?} innerSub
     * @return {?}
     */
    notifyError(error, innerSub) {
        this.subscribeToNextSource();
    }
    /**
     * @param {?} innerSub
     * @return {?}
     */
    notifyComplete(innerSub) {
        this.subscribeToNextSource();
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.subscribeToNextSource();
    }
    /**
     * @return {?}
     */
    _complete() {
        this.subscribeToNextSource();
    }
    /**
     * @return {?}
     */
    subscribeToNextSource() {
        const /** @type {?} */ next = this.nextSources.shift();
        if (next) {
            this.add(subscribeToResult(this, next));
        }
        else {
            this.destination.complete();
        }
    }
}
