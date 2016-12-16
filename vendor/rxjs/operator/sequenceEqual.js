import { Subscriber } from '../Subscriber';
import { tryCatch } from '../util/tryCatch';
import { errorObject } from '../util/errorObject';
/**
 * Compares all values of two observables in sequence using an optional comparor function
 * and returns an observable of a single boolean value representing whether or not the two sequences
 * are equal.
 *
 * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
 *
 * <img src="./img/sequenceEqual.png" width="100%">
 *
 * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
 * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
 * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
 * observables completes, the operator will wait for the other observable to complete; If the other
 * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
 * completes or emits after the other complets, the returned observable will never complete.
 *
 * var code = Rx.Observable.from([
 *  "ArrowUp",
 *  "ArrowUp",
 *  "ArrowDown",
 *  "ArrowDown",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "ArrowLeft",
 *  "ArrowRight",
 *  "KeyB",
 *  "KeyA",
 *  "Enter" // no start key, clearly.
 * ]);
 *
 * var keys = Rx.Observable.fromEvent(document, 'keyup')
 *  .map(e => e.code);
 * var matches = keys.bufferCount(11, 1)
 *  .mergeMap(
 *    last11 =>
 *      Rx.Observable.from(last11)
 *        .sequenceEqual(code)
 *   );
 * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
 *
 * @see {\@link combineLatest}
 * @see {\@link zip}
 * @see {\@link withLatestFrom}
 *
 * the values emitted by both observables were equal in sequence
 * @owner Observable
 * @this {?}
 * @param {?} compareTo
 * @param {?=} comparor
 * @return {?}
 */
export function sequenceEqual(compareTo, comparor) {
    return this.lift(new SequenceEqualOperator(compareTo, comparor));
}
export class SequenceEqualOperator {
    /**
     * @param {?} compareTo
     * @param {?} comparor
     */
    constructor(compareTo, comparor) {
        this.compareTo = compareTo;
        this.comparor = comparor;
    }
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class SequenceEqualSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} compareTo
     * @param {?} comparor
     */
    constructor(destination, compareTo, comparor) {
        super(destination);
        this.compareTo = compareTo;
        this.comparor = comparor;
        this._a = [];
        this._b = [];
        this._oneComplete = false;
        this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, this)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        if (this._oneComplete && this._b.length === 0) {
            this.emit(false);
        }
        else {
            this._a.push(value);
            this.checkValues();
        }
    }
    /**
     * @return {?}
     */
    _complete() {
        if (this._oneComplete) {
            this.emit(this._a.length === 0 && this._b.length === 0);
        }
        else {
            this._oneComplete = true;
        }
    }
    /**
     * @return {?}
     */
    checkValues() {
        const { _a, _b, comparor } = this;
        while (_a.length > 0 && _b.length > 0) {
            let /** @type {?} */ a = _a.shift();
            let /** @type {?} */ b = _b.shift();
            let /** @type {?} */ areEqual = false;
            if (comparor) {
                areEqual = tryCatch(comparor)(a, b);
                if (areEqual === errorObject) {
                    this.destination.error(errorObject.e);
                }
            }
            else {
                areEqual = a === b;
            }
            if (!areEqual) {
                this.emit(false);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    emit(value) {
        const { destination } = this;
        destination.next(value);
        destination.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    nextB(value) {
        if (this._oneComplete && this._a.length === 0) {
            this.emit(false);
        }
        else {
            this._b.push(value);
            this.checkValues();
        }
    }
}
function SequenceEqualSubscriber_tsickle_Closure_declarations() {
    /** @type {?} */
    SequenceEqualSubscriber.prototype._a;
    /** @type {?} */
    SequenceEqualSubscriber.prototype._b;
    /** @type {?} */
    SequenceEqualSubscriber.prototype._oneComplete;
}
class SequenceEqualCompareToSubscriber extends Subscriber {
    /**
     * @param {?} destination
     * @param {?} parent
     */
    constructor(destination, parent) {
        super(destination);
        this.parent = parent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.parent.nextB(value);
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        this.parent.error(err);
    }
    /**
     * @return {?}
     */
    _complete() {
        this.parent._complete();
    }
}
