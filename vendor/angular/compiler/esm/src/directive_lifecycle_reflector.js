goog.module('_angular$compiler$src$directive__lifecycle__reflector');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
const /** @type {?} */ LIFECYCLE_INTERFACES = collection_1.MapWrapper.createFromPairs([
    [core_private_1.LifecycleHooks.OnInit, core_1.OnInit],
    [core_private_1.LifecycleHooks.OnDestroy, core_1.OnDestroy],
    [core_private_1.LifecycleHooks.DoCheck, core_1.DoCheck],
    [core_private_1.LifecycleHooks.OnChanges, core_1.OnChanges],
    [core_private_1.LifecycleHooks.AfterContentInit, core_1.AfterContentInit],
    [core_private_1.LifecycleHooks.AfterContentChecked, core_1.AfterContentChecked],
    [core_private_1.LifecycleHooks.AfterViewInit, core_1.AfterViewInit],
    [core_private_1.LifecycleHooks.AfterViewChecked, core_1.AfterViewChecked],
]);
const /** @type {?} */ LIFECYCLE_PROPS = collection_1.MapWrapper.createFromPairs([
    [core_private_1.LifecycleHooks.OnInit, 'ngOnInit'],
    [core_private_1.LifecycleHooks.OnDestroy, 'ngOnDestroy'],
    [core_private_1.LifecycleHooks.DoCheck, 'ngDoCheck'],
    [core_private_1.LifecycleHooks.OnChanges, 'ngOnChanges'],
    [core_private_1.LifecycleHooks.AfterContentInit, 'ngAfterContentInit'],
    [core_private_1.LifecycleHooks.AfterContentChecked, 'ngAfterContentChecked'],
    [core_private_1.LifecycleHooks.AfterViewInit, 'ngAfterViewInit'],
    [core_private_1.LifecycleHooks.AfterViewChecked, 'ngAfterViewChecked'],
]);
/**
 * @param {?} hook
 * @param {?} token
 * @return {?}
 */
function hasLifecycleHook(hook, token) {
    var /** @type {?} */ lcInterface = LIFECYCLE_INTERFACES.get(hook);
    var /** @type {?} */ lcProp = LIFECYCLE_PROPS.get(hook);
    return core_1.reflector.hasLifecycleHook(token, lcInterface, lcProp);
}
exports.hasLifecycleHook = hasLifecycleHook;
//# sourceMappingURL=directive_lifecycle_reflector.js.map