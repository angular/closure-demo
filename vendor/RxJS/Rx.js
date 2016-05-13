goog.module('rxjs$Rx');
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
var Subject_1 = goog.require('rxjs$Subject');
exports.Subject = Subject_1.Subject;
/* tslint:enable:no-unused-variable */
var Observable_1 = goog.require('rxjs$Observable');
exports.Observable = Observable_1.Observable;
// statics
/* tslint:disable:no-use-before-declare */
var unused_0_ = goog.require('rxjs$add$observable$bindCallback');
var unused_1_ = goog.require('rxjs$add$observable$bindNodeCallback');
var unused_2_ = goog.require('rxjs$add$observable$combineLatest');
var unused_3_ = goog.require('rxjs$add$observable$concat');
var unused_4_ = goog.require('rxjs$add$observable$defer');
var unused_5_ = goog.require('rxjs$add$observable$empty');
var unused_6_ = goog.require('rxjs$add$observable$forkJoin');
var unused_7_ = goog.require('rxjs$add$observable$from');
var unused_8_ = goog.require('rxjs$add$observable$fromEvent');
var unused_9_ = goog.require('rxjs$add$observable$fromEventPattern');
var unused_10_ = goog.require('rxjs$add$observable$fromPromise');
var unused_11_ = goog.require('rxjs$add$observable$interval');
var unused_12_ = goog.require('rxjs$add$observable$merge');
var unused_13_ = goog.require('rxjs$add$observable$race');
var unused_14_ = goog.require('rxjs$add$observable$never');
var unused_15_ = goog.require('rxjs$add$observable$of');
var unused_16_ = goog.require('rxjs$add$observable$range');
var unused_17_ = goog.require('rxjs$add$observable$throw');
var unused_18_ = goog.require('rxjs$add$observable$timer');
var unused_19_ = goog.require('rxjs$add$observable$zip');
//operators
var unused_20_ = goog.require('rxjs$add$operator$buffer');
var unused_21_ = goog.require('rxjs$add$operator$bufferCount');
var unused_22_ = goog.require('rxjs$add$operator$bufferTime');
var unused_23_ = goog.require('rxjs$add$operator$bufferToggle');
var unused_24_ = goog.require('rxjs$add$operator$bufferWhen');
var unused_25_ = goog.require('rxjs$add$operator$cache');
var unused_26_ = goog.require('rxjs$add$operator$catch');
var unused_27_ = goog.require('rxjs$add$operator$combineAll');
var unused_28_ = goog.require('rxjs$add$operator$combineLatest');
var unused_29_ = goog.require('rxjs$add$operator$concat');
var unused_30_ = goog.require('rxjs$add$operator$concatAll');
var unused_31_ = goog.require('rxjs$add$operator$concatMap');
var unused_32_ = goog.require('rxjs$add$operator$concatMapTo');
var unused_33_ = goog.require('rxjs$add$operator$count');
var unused_34_ = goog.require('rxjs$add$operator$dematerialize');
var unused_35_ = goog.require('rxjs$add$operator$debounce');
var unused_36_ = goog.require('rxjs$add$operator$debounceTime');
var unused_37_ = goog.require('rxjs$add$operator$defaultIfEmpty');
var unused_38_ = goog.require('rxjs$add$operator$delay');
var unused_39_ = goog.require('rxjs$add$operator$delayWhen');
var unused_40_ = goog.require('rxjs$add$operator$distinctUntilChanged');
var unused_41_ = goog.require('rxjs$add$operator$do');
var unused_42_ = goog.require('rxjs$add$operator$expand');
var unused_43_ = goog.require('rxjs$add$operator$filter');
var unused_44_ = goog.require('rxjs$add$operator$finally');
var unused_45_ = goog.require('rxjs$add$operator$first');
var unused_46_ = goog.require('rxjs$add$operator$groupBy');
var unused_47_ = goog.require('rxjs$add$operator$ignoreElements');
var unused_48_ = goog.require('rxjs$add$operator$audit');
var unused_49_ = goog.require('rxjs$add$operator$auditTime');
var unused_50_ = goog.require('rxjs$add$operator$last');
var unused_51_ = goog.require('rxjs$add$operator$let');
var unused_52_ = goog.require('rxjs$add$operator$every');
var unused_53_ = goog.require('rxjs$add$operator$map');
var unused_54_ = goog.require('rxjs$add$operator$mapTo');
var unused_55_ = goog.require('rxjs$add$operator$materialize');
var unused_56_ = goog.require('rxjs$add$operator$merge');
var unused_57_ = goog.require('rxjs$add$operator$mergeAll');
var unused_58_ = goog.require('rxjs$add$operator$mergeMap');
var unused_59_ = goog.require('rxjs$add$operator$mergeMapTo');
var unused_60_ = goog.require('rxjs$add$operator$multicast');
var unused_61_ = goog.require('rxjs$add$operator$observeOn');
var unused_62_ = goog.require('rxjs$add$operator$partition');
var unused_63_ = goog.require('rxjs$add$operator$pluck');
var unused_64_ = goog.require('rxjs$add$operator$publish');
var unused_65_ = goog.require('rxjs$add$operator$publishBehavior');
var unused_66_ = goog.require('rxjs$add$operator$publishReplay');
var unused_67_ = goog.require('rxjs$add$operator$publishLast');
var unused_68_ = goog.require('rxjs$add$operator$race');
var unused_69_ = goog.require('rxjs$add$operator$reduce');
var unused_70_ = goog.require('rxjs$add$operator$repeat');
var unused_71_ = goog.require('rxjs$add$operator$retry');
var unused_72_ = goog.require('rxjs$add$operator$retryWhen');
var unused_73_ = goog.require('rxjs$add$operator$sample');
var unused_74_ = goog.require('rxjs$add$operator$sampleTime');
var unused_75_ = goog.require('rxjs$add$operator$scan');
var unused_76_ = goog.require('rxjs$add$operator$share');
var unused_77_ = goog.require('rxjs$add$operator$single');
var unused_78_ = goog.require('rxjs$add$operator$skip');
var unused_79_ = goog.require('rxjs$add$operator$skipUntil');
var unused_80_ = goog.require('rxjs$add$operator$skipWhile');
var unused_81_ = goog.require('rxjs$add$operator$startWith');
var unused_82_ = goog.require('rxjs$add$operator$subscribeOn');
var unused_83_ = goog.require('rxjs$add$operator$switch');
var unused_84_ = goog.require('rxjs$add$operator$switchMap');
var unused_85_ = goog.require('rxjs$add$operator$switchMapTo');
var unused_86_ = goog.require('rxjs$add$operator$take');
var unused_87_ = goog.require('rxjs$add$operator$takeLast');
var unused_88_ = goog.require('rxjs$add$operator$takeUntil');
var unused_89_ = goog.require('rxjs$add$operator$takeWhile');
var unused_90_ = goog.require('rxjs$add$operator$throttle');
var unused_91_ = goog.require('rxjs$add$operator$throttleTime');
var unused_92_ = goog.require('rxjs$add$operator$timeout');
var unused_93_ = goog.require('rxjs$add$operator$timeoutWith');
var unused_94_ = goog.require('rxjs$add$operator$toArray');
var unused_95_ = goog.require('rxjs$add$operator$toPromise');
var unused_96_ = goog.require('rxjs$add$operator$window');
var unused_97_ = goog.require('rxjs$add$operator$windowCount');
var unused_98_ = goog.require('rxjs$add$operator$windowTime');
var unused_99_ = goog.require('rxjs$add$operator$windowToggle');
var unused_100_ = goog.require('rxjs$add$operator$windowWhen');
var unused_101_ = goog.require('rxjs$add$operator$withLatestFrom');
var unused_102_ = goog.require('rxjs$add$operator$zip');
var unused_103_ = goog.require('rxjs$add$operator$zipAll');
/* tslint:disable:no-unused-variable */
var Operator_1 = goog.require('rxjs$Operator');
exports.Operator = Operator_1.Operator;
var Subscription_1 = goog.require('rxjs$Subscription');
exports.Subscription = Subscription_1.Subscription;
var Subscriber_1 = goog.require('rxjs$Subscriber');
exports.Subscriber = Subscriber_1.Subscriber;
var AsyncSubject_1 = goog.require('rxjs$AsyncSubject');
exports.AsyncSubject = AsyncSubject_1.AsyncSubject;
var ReplaySubject_1 = goog.require('rxjs$ReplaySubject');
exports.ReplaySubject = ReplaySubject_1.ReplaySubject;
var BehaviorSubject_1 = goog.require('rxjs$BehaviorSubject');
exports.BehaviorSubject = BehaviorSubject_1.BehaviorSubject;
var ConnectableObservable_1 = goog.require('rxjs$observable$ConnectableObservable');
exports.ConnectableObservable = ConnectableObservable_1.ConnectableObservable;
var Notification_1 = goog.require('rxjs$Notification');
exports.Notification = Notification_1.Notification;
var EmptyError_1 = goog.require('rxjs$util$EmptyError');
exports.EmptyError = EmptyError_1.EmptyError;
var ArgumentOutOfRangeError_1 = goog.require('rxjs$util$ArgumentOutOfRangeError');
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
var ObjectUnsubscribedError_1 = goog.require('rxjs$util$ObjectUnsubscribedError');
exports.ObjectUnsubscribedError = ObjectUnsubscribedError_1.ObjectUnsubscribedError;
var UnsubscriptionError_1 = goog.require('rxjs$util$UnsubscriptionError');
exports.UnsubscriptionError = UnsubscriptionError_1.UnsubscriptionError;
var asap_1 = goog.require('rxjs$scheduler$asap');
var async_1 = goog.require('rxjs$scheduler$async');
var queue_1 = goog.require('rxjs$scheduler$queue');
var rxSubscriber_1 = goog.require('rxjs$symbol$rxSubscriber');
var observable_1 = goog.require('rxjs$symbol$observable');
var iterator_1 = goog.require('rxjs$symbol$iterator');
/* tslint:enable:no-unused-variable */
/**
 * @typedef {Object} Rx.Scheduler
 * @property {Scheduler} queue Schedules on a queue in the current event frame
 * (trampoline scheduler). Use this for iteration operations.
 * @property {Scheduler} asap Schedules on the micro task queue, which uses the
 * fastest transport mechanism available, either Node.js' `process.nextTick()`
 * or Web Worker MessageChannel or setTimeout or others. Use this for
 * asynchronous conversions.
 * @property {Scheduler} async Schedules work with `setInterval`. Use this for
 * time-based operations.
 */
let /** @type {?} */ Scheduler = {
    asap: asap_1.asap,
    async: async_1.async,
    queue: queue_1.queue
};
exports.Scheduler = Scheduler;
/**
 * @typedef {Object} Rx.Symbol
 * @property {Symbol|string} rxSubscriber A symbol to use as a property name to
 * retrieve an "Rx safe" Observer from an object. "Rx safety" can be defined as
 * an object that has all of the traits of an Rx Subscriber, including the
 * ability to add and remove subscriptions to the subscription chain and
 * guarantees involving event triggering (can't "next" after unsubscription,
 * etc).
 * @property {Symbol|string} observable A symbol to use as a property name to
 * retrieve an Observable as defined by the [ECMAScript "Observable" spec](https://github.com/zenparsing/es-observable).
 * @property {Symbol|string} iterator The ES6 symbol to use as a property name
 * to retrieve an iterator from an object.
 */
let /** @type {?} */ Symbol = {
    rxSubscriber: rxSubscriber_1.$$rxSubscriber,
    observable: observable_1.$$observable,
    iterator: iterator_1.$$iterator
};
exports.Symbol = Symbol;
