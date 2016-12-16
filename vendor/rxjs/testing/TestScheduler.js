import { Observable } from '../Observable';
import { Notification } from '../Notification';
import { ColdObservable } from './ColdObservable';
import { HotObservable } from './HotObservable';
import { SubscriptionLog } from './SubscriptionLog';
import { VirtualTimeScheduler, VirtualAction } from '../scheduler/VirtualTimeScheduler';
const /** @type {?} */ defaultMaxFrame = 750;
export class TestScheduler extends VirtualTimeScheduler {
    /**
     * @param {?} assertDeepEqual
     */
    constructor(assertDeepEqual) {
        super(VirtualAction, defaultMaxFrame);
        this.assertDeepEqual = assertDeepEqual;
        this.hotObservables = [];
        this.coldObservables = [];
        this.flushTests = [];
    }
    /**
     * @param {?} marbles
     * @return {?}
     */
    createTime(marbles) {
        const /** @type {?} */ indexOf = marbles.indexOf('|');
        if (indexOf === -1) {
            throw new Error('marble diagram for time should have a completion marker "|"');
        }
        return indexOf * TestScheduler.frameTimeFactor;
    }
    /**
     * @param {?} marbles
     * @param {?=} values
     * @param {?=} error
     * @return {?}
     */
    createColdObservable(marbles, values, error) {
        if (marbles.indexOf('^') !== -1) {
            throw new Error('cold observable cannot have subscription offset "^"');
        }
        if (marbles.indexOf('!') !== -1) {
            throw new Error('cold observable cannot have unsubscription marker "!"');
        }
        const /** @type {?} */ messages = TestScheduler.parseMarbles(marbles, values, error);
        const /** @type {?} */ cold = new ColdObservable(messages, this);
        this.coldObservables.push(cold);
        return cold;
    }
    /**
     * @param {?} marbles
     * @param {?=} values
     * @param {?=} error
     * @return {?}
     */
    createHotObservable(marbles, values, error) {
        if (marbles.indexOf('!') !== -1) {
            throw new Error('hot observable cannot have unsubscription marker "!"');
        }
        const /** @type {?} */ messages = TestScheduler.parseMarbles(marbles, values, error);
        const /** @type {?} */ subject = new HotObservable(messages, this);
        this.hotObservables.push(subject);
        return subject;
    }
    /**
     * @param {?} observable
     * @param {?} outerFrame
     * @return {?}
     */
    materializeInnerObservable(observable, outerFrame) {
        const /** @type {?} */ messages = [];
        observable.subscribe((value) => {
            messages.push({ frame: this.frame - outerFrame, notification: Notification.createNext(value) });
        }, (err) => {
            messages.push({ frame: this.frame - outerFrame, notification: Notification.createError(err) });
        }, () => {
            messages.push({ frame: this.frame - outerFrame, notification: Notification.createComplete() });
        });
        return messages;
    }
    /**
     * @param {?} observable
     * @param {?=} unsubscriptionMarbles
     * @return {?}
     */
    expectObservable(observable, unsubscriptionMarbles = null) {
        const /** @type {?} */ actual = [];
        const /** @type {?} */ flushTest = { actual, ready: false };
        const /** @type {?} */ unsubscriptionFrame = TestScheduler
            .parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
        let /** @type {?} */ subscription;
        this.schedule(() => {
            subscription = observable.subscribe(x => {
                let /** @type {?} */ value = x;
                // Support Observable-of-Observables
                if (x instanceof Observable) {
                    value = this.materializeInnerObservable(value, this.frame);
                }
                actual.push({ frame: this.frame, notification: Notification.createNext(value) });
            }, (err) => {
                actual.push({ frame: this.frame, notification: Notification.createError(err) });
            }, () => {
                actual.push({ frame: this.frame, notification: Notification.createComplete() });
            });
        }, 0);
        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
            this.schedule(() => subscription.unsubscribe(), unsubscriptionFrame);
        }
        this.flushTests.push(flushTest);
        return {
            /**
             * @param {?} marbles
             * @param {?=} values
             * @param {?=} errorValue
             * @return {?}
             */
            toBe(marbles, values, errorValue) {
                flushTest.ready = true;
                flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
            }
        };
    }
    /**
     * @param {?} actualSubscriptionLogs
     * @return {?}
     */
    expectSubscriptions(actualSubscriptionLogs) {
        const /** @type {?} */ flushTest = { actual: actualSubscriptionLogs, ready: false };
        this.flushTests.push(flushTest);
        return {
            /**
             * @param {?} marbles
             * @return {?}
             */
            toBe(marbles) {
                const /** @type {?} */ marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
                flushTest.ready = true;
                flushTest.expected = marblesArray.map(marbles => TestScheduler.parseMarblesAsSubscriptions(marbles));
            }
        };
    }
    /**
     * @return {?}
     */
    flush() {
        const /** @type {?} */ hotObservables = this.hotObservables;
        while (hotObservables.length > 0) {
            hotObservables.shift().setup();
        }
        super.flush();
        const /** @type {?} */ readyFlushTests = this.flushTests.filter(test => test.ready);
        while (readyFlushTests.length > 0) {
            const /** @type {?} */ test = readyFlushTests.shift();
            this.assertDeepEqual(test.actual, test.expected);
        }
    }
    /**
     * @param {?} marbles
     * @return {?}
     */
    static parseMarblesAsSubscriptions(marbles) {
        if (typeof marbles !== 'string') {
            return new SubscriptionLog(Number.POSITIVE_INFINITY);
        }
        const /** @type {?} */ len = marbles.length;
        let /** @type {?} */ groupStart = -1;
        let /** @type {?} */ subscriptionFrame = Number.POSITIVE_INFINITY;
        let /** @type {?} */ unsubscriptionFrame = Number.POSITIVE_INFINITY;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            const /** @type {?} */ frame = i * this.frameTimeFactor;
            const /** @type {?} */ c = marbles[i];
            switch (c) {
                case '-':
                case ' ':
                    break;
                case '(':
                    groupStart = frame;
                    break;
                case ')':
                    groupStart = -1;
                    break;
                case '^':
                    if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    subscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                case '!':
                    if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
                        throw new Error('found a second subscription point \'^\' in a ' +
                            'subscription marble diagram. There can only be one.');
                    }
                    unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
                    break;
                default:
                    throw new Error('there can only be \'^\' and \'!\' markers in a ' +
                        'subscription marble diagram. Found instead \'' + c + '\'.');
            }
        }
        if (unsubscriptionFrame < 0) {
            return new SubscriptionLog(subscriptionFrame);
        }
        else {
            return new SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
        }
    }
    /**
     * @param {?} marbles
     * @param {?=} values
     * @param {?=} errorValue
     * @param {?=} materializeInnerObservables
     * @return {?}
     */
    static parseMarbles(marbles, values, errorValue, materializeInnerObservables = false) {
        if (marbles.indexOf('!') !== -1) {
            throw new Error('conventional marble diagrams cannot have the ' +
                'unsubscription marker "!"');
        }
        const /** @type {?} */ len = marbles.length;
        const /** @type {?} */ testMessages = [];
        const /** @type {?} */ subIndex = marbles.indexOf('^');
        const /** @type {?} */ frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
        const /** @type {?} */ getValue = typeof values !== 'object' ?
            (x) => x :
            (x) => {
                // Support Observable-of-Observables
                if (materializeInnerObservables && values[x] instanceof ColdObservable) {
                    return values[x].messages;
                }
                return values[x];
            };
        let /** @type {?} */ groupStart = -1;
        for (let /** @type {?} */ i = 0; i < len; i++) {
            const /** @type {?} */ frame = i * this.frameTimeFactor + frameOffset;
            let /** @type {?} */ notification;
            const /** @type {?} */ c = marbles[i];
            switch (c) {
                case '-':
                case ' ':
                    break;
                case '(':
                    groupStart = frame;
                    break;
                case ')':
                    groupStart = -1;
                    break;
                case '|':
                    notification = Notification.createComplete();
                    break;
                case '^':
                    break;
                case '#':
                    notification = Notification.createError(errorValue || 'error');
                    break;
                default:
                    notification = Notification.createNext(getValue(c));
                    break;
            }
            if (notification) {
                testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification });
            }
        }
        return testMessages;
    }
}
function TestScheduler_tsickle_Closure_declarations() {
    /** @type {?} */
    TestScheduler.prototype.hotObservables;
    /** @type {?} */
    TestScheduler.prototype.coldObservables;
    /** @type {?} */
    TestScheduler.prototype.flushTests;
}
