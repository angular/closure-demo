/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NoOpAnimationPlayer } from '../private_import_core';
var _NoOpAnimationDriver = (function () {
    function _NoOpAnimationDriver() {
    }
    /**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    _NoOpAnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) {
        if (previousPlayers === void 0) { previousPlayers = []; }
        return new NoOpAnimationPlayer();
    };
    return _NoOpAnimationDriver;
}());
/**
 * @experimental
 */
export var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    /**
     * @abstract
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */
    AnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing, previousPlayers) { };
    AnimationDriver._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationDriver.NOOP;
    };
    AnimationDriver.NOOP = new _NoOpAnimationDriver();
    return AnimationDriver;
}());
//# sourceMappingURL=animation_driver.js.map