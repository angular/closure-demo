import { Subscriber } from '../Subscriber';
/**
 * Groups pairs of consecutive emissions together and emits them as an array of
 * two values.
 *
 * <span class="informal">Puts the current value and previous value together as
 * an array, and emits that.</span>
 *
 * <img src="./img/pairwise.png" width="100%">
 *
 * The Nth emission from the source Observable will cause the output Observable
 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
 * pair. For this reason, `pairwise` emits on the second and subsequent
 * emissions from the source Observable, but not on the first emission, because
 * there is no previous value in that case.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var pairs = clicks.pairwise();
 * var distance = pairs.map(pair => {
 *   var x0 = pair[0].clientX;
 *   var y0 = pair[0].clientY;
 *   var x1 = pair[1].clientX;
 *   var y1 = pair[1].clientY;
 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
 * });
 * distance.subscribe(x => console.log(x));
 *
 * @see {\@link buffer}
 * @see {\@link bufferCount}
 *
 * consecutive values from the source Observable.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function pairwise() {
    return this.lift(new PairwiseOperator());
}
class PairwiseOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new PairwiseSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class PairwiseSubscriber extends Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
        this.hasPrev = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this.hasPrev) {
            this.destination.next([this.prev, value]);
        }
        else {
            this.hasPrev = true;
        }
        this.prev = value;
    }
}
function PairwiseSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    PairwiseSubscriber.prototype.prev;
    /** @type {?} */
    PairwiseSubscriber.prototype.hasPrev;
}
