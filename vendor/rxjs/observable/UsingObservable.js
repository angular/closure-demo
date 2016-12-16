import { Observable } from '../Observable';
import { subscribeToResult } from '../util/subscribeToResult';
import { OuterSubscriber } from '../OuterSubscriber';
/**
 * We need this JSDoc comment for affecting ESDoc.
 */
export class UsingObservable extends Observable {
    /**
     * @param {?} resourceFactory
     * @param {?} observableFactory
     */
    constructor(resourceFactory, observableFactory) {
        super();
        this.resourceFactory = resourceFactory;
        this.observableFactory = observableFactory;
    }
    /**
     * @param {?} resourceFactory
     * @param {?} observableFactory
     * @return {?}
     */
    static create(resourceFactory, observableFactory) {
        return new UsingObservable(resourceFactory, observableFactory);
    }
    /**
     * @param {?} subscriber
     * @return {?}
     */
    _subscribe(subscriber) {
        const { resourceFactory, observableFactory } = this;
        let /** @type {?} */ resource;
        try {
            resource = (resourceFactory());
            return new UsingSubscriber(subscriber, resource, observableFactory);
        }
        catch (err) {
            subscriber.error(err);
        }
    }
}
class UsingSubscriber extends OuterSubscriber {
    /**
     * @param {?} destination
     * @param {?} resource
     * @param {?} observableFactory
     */
    constructor(destination, resource, observableFactory) {
        super(destination);
        this.resource = resource;
        this.observableFactory = observableFactory;
        destination.add(resource);
        this.tryUse();
    }
    /**
     * @return {?}
     */
    tryUse() {
        try {
            const /** @type {?} */ source = this.observableFactory.call(this, this.resource);
            if (source) {
                this.add(subscribeToResult(this, source));
            }
        }
        catch (err) {
            this._error(err);
        }
    }
}
