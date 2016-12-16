/**
Some credit for this helper goes to http://github.com/YuzuJS/setImmediate
*/
import { root } from './root';
export class ImmediateDefinition {
    /**
     * @param {?} root
     */
    constructor(root) {
        this.root = root;
        if (root.setImmediate && typeof root.setImmediate === 'function') {
            this.setImmediate = root.setImmediate.bind(root);
            this.clearImmediate = root.clearImmediate.bind(root);
        }
        else {
            this.nextHandle = 1;
            this.tasksByHandle = {};
            this.currentlyRunningATask = false;
            // Don't get fooled by e.g. browserify environments.
            if (this.canUseProcessNextTick()) {
                // For Node.js before 0.9
                this.setImmediate = this.createProcessNextTickSetImmediate();
            }
            else if (this.canUsePostMessage()) {
                // For non-IE10 modern browsers
                this.setImmediate = this.createPostMessageSetImmediate();
            }
            else if (this.canUseMessageChannel()) {
                // For web workers, where supported
                this.setImmediate = this.createMessageChannelSetImmediate();
            }
            else if (this.canUseReadyStateChange()) {
                // For IE 6–8
                this.setImmediate = this.createReadyStateChangeSetImmediate();
            }
            else {
                // For older browsers
                this.setImmediate = this.createSetTimeoutSetImmediate();
            }
            let ci = function clearImmediate(handle) {
                delete clearImmediate.instance.tasksByHandle[handle];
            };
            ci.instance = this;
            this.clearImmediate = ci;
        }
    }
    /**
     * @param {?} o
     * @return {?}
     */
    identify(o) {
        return this.root.Object.prototype.toString.call(o);
    }
    /**
     * @return {?}
     */
    canUseProcessNextTick() {
        return this.identify(this.root.process) === '[object process]';
    }
    /**
     * @return {?}
     */
    canUseMessageChannel() {
        return Boolean(this.root.MessageChannel);
    }
    /**
     * @return {?}
     */
    canUseReadyStateChange() {
        const /** @type {?} */ document = this.root.document;
        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
    }
    /**
     * @return {?}
     */
    canUsePostMessage() {
        const /** @type {?} */ root = this.root;
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `root.postMessage` means something completely different and can't be used for this purpose.
        if (root.postMessage && !root.importScripts) {
            let /** @type {?} */ postMessageIsAsynchronous = true;
            let /** @type {?} */ oldOnMessage = root.onmessage;
            root.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            root.postMessage('', '*');
            root.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
        return false;
    }
    /**
     * @param {?} handler
     * @param {...?} args
     * @return {?}
     */
    partiallyApplied(handler, ...args) {
        let /** @type {?} */ fn = function result() {
            const { handler, args } = (result);
            if (typeof handler === 'function') {
                handler.apply(undefined, args);
            }
            else {
                (new Function('' + handler))();
            }
        };
        ((fn)).handler = handler;
        ((fn)).args = args;
        return fn;
    }
    /**
     * @param {?} args
     * @return {?}
     */
    addFromSetImmediateArguments(args) {
        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
        return this.nextHandle++;
    }
    /**
     * @return {?}
     */
    createProcessNextTickSetImmediate() {
        let /** @type {?} */ fn = function setImmediate() {
            const { instance } = ((setImmediate));
            let /** @type {?} */ handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
            return handle;
        };
        ((fn)).instance = this;
        return fn;
    }
    /**
     * @return {?}
     */
    createPostMessageSetImmediate() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
        const /** @type {?} */ root = this.root;
        let /** @type {?} */ messagePrefix = 'setImmediate$' + root.Math.random() + '$';
        let /** @type {?} */ onGlobalMessage = function globalMessageHandler(event) {
            const /** @type {?} */ instance = ((globalMessageHandler)).instance;
            if (event.source === root &&
                typeof event.data === 'string' &&
                event.data.indexOf(messagePrefix) === 0) {
                instance.runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };
        ((onGlobalMessage)).instance = this;
        root.addEventListener('message', onGlobalMessage, false);
        let /** @type {?} */ fn = function setImmediate() {
            const { messagePrefix, instance } = ((setImmediate));
            let /** @type {?} */ handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.postMessage(messagePrefix + handle, '*');
            return handle;
        };
        ((fn)).instance = this;
        ((fn)).messagePrefix = messagePrefix;
        return fn;
    }
    /**
     * @param {?} handle
     * @return {?}
     */
    runIfPresent(handle) {
        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
        // So if we're currently running a task, we'll need to delay this invocation.
        if (this.currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // 'too much recursion' error.
            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
        }
        else {
            let /** @type {?} */ task = this.tasksByHandle[handle];
            if (task) {
                this.currentlyRunningATask = true;
                try {
                    task();
                }
                finally {
                    this.clearImmediate(handle);
                    this.currentlyRunningATask = false;
                }
            }
        }
    }
    /**
     * @return {?}
     */
    createMessageChannelSetImmediate() {
        let /** @type {?} */ channel = new this.root.MessageChannel();
        channel.port1.onmessage = (event) => {
            let /** @type {?} */ handle = event.data;
            this.runIfPresent(handle);
        };
        let /** @type {?} */ fn = function setImmediate() {
            const { channel, instance } = ((setImmediate));
            let /** @type {?} */ handle = instance.addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
        ((fn)).channel = channel;
        ((fn)).instance = this;
        return fn;
    }
    /**
     * @return {?}
     */
    createReadyStateChangeSetImmediate() {
        let /** @type {?} */ fn = function setImmediate() {
            const /** @type {?} */ instance = ((setImmediate)).instance;
            const /** @type {?} */ root = instance.root;
            const /** @type {?} */ doc = root.document;
            const /** @type {?} */ html = doc.documentElement;
            let /** @type {?} */ handle = instance.addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            let /** @type {?} */ script = doc.createElement('script');
            script.onreadystatechange = () => {
                instance.runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
        ((fn)).instance = this;
        return fn;
    }
    /**
     * @return {?}
     */
    createSetTimeoutSetImmediate() {
        let /** @type {?} */ fn = function setImmediate() {
            const /** @type {?} */ instance = ((setImmediate)).instance;
            let /** @type {?} */ handle = instance.addFromSetImmediateArguments(arguments);
            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
            return handle;
        };
        ((fn)).instance = this;
        return fn;
    }
}
function ImmediateDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    ImmediateDefinition.prototype.setImmediate;
    /** @type {?} */
    ImmediateDefinition.prototype.clearImmediate;
    /** @type {?} */
    ImmediateDefinition.prototype.tasksByHandle;
    /** @type {?} */
    ImmediateDefinition.prototype.nextHandle;
    /** @type {?} */
    ImmediateDefinition.prototype.currentlyRunningATask;
}
export const /** @type {?} */ Immediate = new ImmediateDefinition(root);
