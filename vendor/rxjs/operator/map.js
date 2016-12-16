import { Subscriber } from '../Subscriber';
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {\@link mapTo}
 * @see {\@link pluck}
 *
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * `project` function.
 * Observable transformed by the given `project` function.
 * @owner Observable
 * @this {?}
 * @param {?} project
 * @param {?=} thisArg
 * @return {?}
 */
export function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
export class MapOperator {
    /**
     * @param {?} project
     * @param {?} thisArg
     */
    constructor(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class MapSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} project
     * @param {?} thisArg
     */
    constructor(destination, project, thisArg) {
        super(destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        let /** @type {?} */ result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
function MapSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    MapSubscriber.prototype.count;
    /** @type {?} */
    MapSubscriber.prototype.thisArg;
}
