import { Subscriber } from '../Subscriber';
import { Notification } from '../Notification';
/**
 * Represents all of the notifications from the source Observable as `next`
 * emissions marked with their original types within {\@link Notification}
 * objects.
 *
 * <span class="informal">Wraps `next`, `error` and `complete` emissions in
 * {\@link Notification} objects, emitted as `next` on the output Observable.
 * </span>
 *
 * <img src="./img/materialize.png" width="100%">
 *
 * `materialize` returns an Observable that emits a `next` notification for each
 * `next`, `error`, or `complete` emission of the source Observable. When the
 * source Observable emits `complete`, the output Observable will emit `next` as
 * a Notification of type "complete", and then it will emit `complete` as well.
 * When the source Observable emits `error`, the output will emit `next` as a
 * Notification of type "error", and then `complete`.
 *
 * This operator is useful for producing metadata of the source Observable, to
 * be consumed as `next` emissions. Use it in conjunction with
 * {\@link dematerialize}.
 *
 * var letters = Rx.Observable.of('a', 'b', 13, 'd');
 * var upperCase = letters.map(x => x.toUpperCase());
 * var materialized = upperCase.materialize();
 * materialized.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
 * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
 * // - Notification {kind: "E", value: undefined, error: TypeError:
 * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
 * //   [as project] (http://1…, hasValue: false}
 *
 * @see {\@link Notification}
 * @see {\@link dematerialize}
 *
 * {\@link Notification} objects that wrap the original emissions from the source
 * Observable with metadata.
 * @owner Observable
 * @this {?}
 * @return {?}
 */
export function materialize() {
    return this.lift(new MaterializeOperator());
}
class MaterializeOperator {
    /**
     * @param {?} subscriber
     * @param {?} source
     * @return {?}
     */
    call(subscriber, source) {
        return source.subscribe(new MaterializeSubscriber(subscriber));
    }
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
class MaterializeSubscriber extends Subscriber {
    /**
     * @param {?} destination
     */
    constructor(destination) {
        super(destination);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _next(value) {
        this.destination.next(Notification.createNext(value));
    }
    /**
     * @param {?} err
     * @return {?}
     */
    _error(err) {
        const /** @type {?} */ destination = this.destination;
        destination.next(Notification.createError(err));
        destination.complete();
    }
    /**
     * @return {?}
     */
    _complete() {
        const /** @type {?} */ destination = this.destination;
        destination.next(Notification.createComplete());
        destination.complete();
    }
}
