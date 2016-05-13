goog.module('_angular$common$src$facade$async');
var lang_1 = goog.require('_angular$common$src$facade$lang');
var promise_1 = goog.require('_angular$common$src$facade$promise');
exports.PromiseWrapper = promise_1.PromiseWrapper;
exports.PromiseCompleter = promise_1.PromiseCompleter;
var Subject_1 = goog.require('rxjs$Subject');
var PromiseObservable_1 = goog.require('rxjs$observable$PromiseObservable');
var toPromise_1 = goog.require('rxjs$operator$toPromise');
var Observable_1 = goog.require('rxjs$Observable');
exports.Observable = Observable_1.Observable;
var Subject_2 = Subject_1;
exports.Subject = Subject_2.Subject;
class TimerWrapper {
    /**
     * @param {?} fn
     * @param {?} millis
     * @return {?}
     */
    static setTimeout(fn, millis) {
        return lang_1.global.setTimeout(fn, millis);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    static clearTimeout(id) { lang_1.global.clearTimeout(id); }
    /**
     * @param {?} fn
     * @param {?} millis
     * @return {?}
     */
    static setInterval(fn, millis) {
        return lang_1.global.setInterval(fn, millis);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    static clearInterval(id) { lang_1.global.clearInterval(id); }
}
exports.TimerWrapper = TimerWrapper;
class ObservableWrapper {
    /**
     * @param {?} emitter
     * @param {?} onNext
     * @param {?=} onError
     * @param {?=} onComplete
     * @return {?}
     */
    static subscribe(emitter, onNext, onError, onComplete = () => { }) {
        onError = (typeof onError === "function") && onError || lang_1.noop;
        onComplete = (typeof onComplete === "function") && onComplete || lang_1.noop;
        return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
    }
    /**
     * @param {?} obs
     * @return {?}
     */
    static isObservable(obs) { return !!obs.subscribe; }
    /**
     *  Returns whether `obs` has any subscribers listening to events.
     * @param {?} obs
     * @return {?}
     */
    static hasSubscribers(obs) { return obs.observers.length > 0; }
    /**
     * @param {?} subscription
     * @return {?}
     */
    static dispose(subscription) { subscription.unsubscribe(); }
    /**
     * @deprecated - use callEmit() instead
     * @param {?} emitter
     * @param {?} value
     * @return {?}
     */
    static callNext(emitter, value) { emitter.next(value); }
    /**
     * @param {?} emitter
     * @param {?} value
     * @return {?}
     */
    static callEmit(emitter, value) { emitter.emit(value); }
    /**
     * @param {?} emitter
     * @param {?} error
     * @return {?}
     */
    static callError(emitter, error) { emitter.error(error); }
    /**
     * @param {?} emitter
     * @return {?}
     */
    static callComplete(emitter) { emitter.complete(); }
    /**
     * @param {?} promise
     * @return {?}
     */
    static fromPromise(promise) {
        return PromiseObservable_1.PromiseObservable.create(promise);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    static toPromise(obj) { return toPromise_1.toPromise.call(obj); }
}
exports.ObservableWrapper = ObservableWrapper;
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
class EventEmitter extends Subject_1.Subject {
    /**
     *  Creates an instance of [EventEmitter], which depending on [isAsync], delivers events synchronously or asynchronously.
     * @param {?=} isAsync
     */
    constructor(isAsync = true) {
        super();
        this._isAsync = isAsync;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    emit(value) { super.next(value); }
    /**
     * @deprecated - use .emit(value) instead
     * @param {?} value
     * @return {?}
     */
    next(value) { super.next(value); }
    /**
     * @param {?=} generatorOrNext
     * @param {?=} error
     * @param {?=} complete
     * @return {?}
     */
    subscribe(generatorOrNext, error, complete) {
        let /** @type {?} */ schedulerFn;
        let /** @type {?} */ errorFn = (err) => null;
        let /** @type {?} */ completeFn = () => null;
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this._isAsync ? (value) => { setTimeout(() => generatorOrNext.next(value)); } :
                    (value) => { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this._isAsync ? (err) => { setTimeout(() => generatorOrNext.error(err)); } :
                        (err) => { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this._isAsync ? () => { setTimeout(() => generatorOrNext.complete()); } :
                        () => { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this._isAsync ? (value) => { setTimeout(() => generatorOrNext(value)); } :
                    (value) => { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this._isAsync ? (err) => { setTimeout(() => error(err)); } : (err) => { error(err); };
            }
            if (complete) {
                completeFn =
                    this._isAsync ? () => { setTimeout(() => complete()); } : () => { complete(); };
            }
        }
        return super.subscribe(schedulerFn, errorFn, completeFn);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        EventEmitter.prototype._isAsync;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=async.js.map