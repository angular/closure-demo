goog.module('_angular$platform_browser$src$browser$tools$common__tools');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var browser_1 = goog.require('_angular$platform_browser$src$facade$browser');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
class ChangeDetectionPerfRecord {
    /**
     * @param {?} msPerTick
     * @param {?} numTicks
     */
    constructor(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ChangeDetectionPerfRecord.prototype.msPerTick;
        /** @type {?} */
        ChangeDetectionPerfRecord.prototype.numTicks;
    }
}
exports.ChangeDetectionPerfRecord = ChangeDetectionPerfRecord;
/**
 * Entry point for all Angular debug tools. This object corresponds to the `ng`
 * global variable accessible in the dev console.
 */
class AngularTools {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.profiler = new AngularProfiler(ref);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AngularTools.prototype.profiler;
    }
}
exports.AngularTools = AngularTools;
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
class AngularProfiler {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.appRef = ref.injector.get(core_1.ApplicationRef);
    }
    /**
     *  Exercises change detection in a loop and then prints the average amount of time in milliseconds how long a single round of change detection takes for the current state of the UI. It runs a minimum of 5 rounds for a minimum of 500 milliseconds. * Optionally, a user may pass a `config` parameter containing a map of options. Supported options are: * `record` (boolean) - causes the profiler to record a CPU profile while it exercises the change detector. Example: * ``` ng.profiler.timeChangeDetection({record: true}) ```
     * @param {?} config
     * @return {?}
     */
    timeChangeDetection(config) {
        var /** @type {?} */ record = lang_1.isPresent(config) && config['record'];
        var /** @type {?} */ profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        var /** @type {?} */ isProfilerAvailable = lang_1.isPresent(browser_1.window.console.profile);
        if (record && isProfilerAvailable) {
            browser_1.window.console.profile(profileName);
        }
        var /** @type {?} */ start = dom_adapter_1.getDOM().performanceNow();
        var /** @type {?} */ numTicks = 0;
        while (numTicks < 5 || (dom_adapter_1.getDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        var /** @type {?} */ end = dom_adapter_1.getDOM().performanceNow();
        if (record && isProfilerAvailable) {
            // need to cast to <any> because type checker thinks there's no argument
            // while in fact there is:
            //
            // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
            ((browser_1.window.console.profileEnd))(profileName);
        }
        var /** @type {?} */ msPerTick = (end - start) / numTicks;
        browser_1.window.console.log(`ran ${numTicks} change detection cycles`);
        browser_1.window.console.log(`${lang_1.NumberWrapper.toFixed(msPerTick, 2)} ms per check`);
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AngularProfiler.prototype.appRef;
    }
}
exports.AngularProfiler = AngularProfiler;
//# sourceMappingURL=common_tools.js.map