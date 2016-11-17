/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
export var AnimationAst = (function () {
    function AnimationAst() {
        this.startTime = 0;
        this.playTime = 0;
    }
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationAst.prototype.visit = function (visitor, context) { };
    AnimationAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationAst.prototype.startTime;
        /** @type {?} */
        AnimationAst.prototype.playTime;
    };
    return AnimationAst;
}());
export var AnimationStateAst = (function (_super) {
    __extends(AnimationStateAst, _super);
    function AnimationStateAst() {
        _super.apply(this, arguments);
    }
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationStateAst.prototype.visit = function (visitor, context) { };
    return AnimationStateAst;
}(AnimationAst));
export var AnimationEntryAst = (function (_super) {
    __extends(AnimationEntryAst, _super);
    /**
     * @param {?} name
     * @param {?} stateDeclarations
     * @param {?} stateTransitions
     */
    function AnimationEntryAst(name, stateDeclarations, stateTransitions) {
        _super.call(this);
        this.name = name;
        this.stateDeclarations = stateDeclarations;
        this.stateTransitions = stateTransitions;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationEntryAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationEntry(this, context);
    };
    AnimationEntryAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationEntryAst.prototype.name;
        /** @type {?} */
        AnimationEntryAst.prototype.stateDeclarations;
        /** @type {?} */
        AnimationEntryAst.prototype.stateTransitions;
    };
    return AnimationEntryAst;
}(AnimationAst));
export var AnimationStateDeclarationAst = (function (_super) {
    __extends(AnimationStateDeclarationAst, _super);
    /**
     * @param {?} stateName
     * @param {?} styles
     */
    function AnimationStateDeclarationAst(stateName, styles) {
        _super.call(this);
        this.stateName = stateName;
        this.styles = styles;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationStateDeclarationAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStateDeclaration(this, context);
    };
    AnimationStateDeclarationAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationStateDeclarationAst.prototype.stateName;
        /** @type {?} */
        AnimationStateDeclarationAst.prototype.styles;
    };
    return AnimationStateDeclarationAst;
}(AnimationStateAst));
export var AnimationStateTransitionExpression = (function () {
    /**
     * @param {?} fromState
     * @param {?} toState
     */
    function AnimationStateTransitionExpression(fromState, toState) {
        this.fromState = fromState;
        this.toState = toState;
    }
    AnimationStateTransitionExpression._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationStateTransitionExpression.prototype.fromState;
        /** @type {?} */
        AnimationStateTransitionExpression.prototype.toState;
    };
    return AnimationStateTransitionExpression;
}());
export var AnimationStateTransitionAst = (function (_super) {
    __extends(AnimationStateTransitionAst, _super);
    /**
     * @param {?} stateChanges
     * @param {?} animation
     */
    function AnimationStateTransitionAst(stateChanges, animation) {
        _super.call(this);
        this.stateChanges = stateChanges;
        this.animation = animation;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationStateTransitionAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStateTransition(this, context);
    };
    AnimationStateTransitionAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationStateTransitionAst.prototype.stateChanges;
        /** @type {?} */
        AnimationStateTransitionAst.prototype.animation;
    };
    return AnimationStateTransitionAst;
}(AnimationStateAst));
export var AnimationStepAst = (function (_super) {
    __extends(AnimationStepAst, _super);
    /**
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     */
    function AnimationStepAst(startingStyles, keyframes, duration, delay, easing) {
        _super.call(this);
        this.startingStyles = startingStyles;
        this.keyframes = keyframes;
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationStepAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStep(this, context);
    };
    AnimationStepAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationStepAst.prototype.startingStyles;
        /** @type {?} */
        AnimationStepAst.prototype.keyframes;
        /** @type {?} */
        AnimationStepAst.prototype.duration;
        /** @type {?} */
        AnimationStepAst.prototype.delay;
        /** @type {?} */
        AnimationStepAst.prototype.easing;
    };
    return AnimationStepAst;
}(AnimationAst));
export var AnimationStylesAst = (function (_super) {
    __extends(AnimationStylesAst, _super);
    /**
     * @param {?} styles
     */
    function AnimationStylesAst(styles) {
        _super.call(this);
        this.styles = styles;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationStylesAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStyles(this, context);
    };
    AnimationStylesAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationStylesAst.prototype.styles;
    };
    return AnimationStylesAst;
}(AnimationAst));
export var AnimationKeyframeAst = (function (_super) {
    __extends(AnimationKeyframeAst, _super);
    /**
     * @param {?} offset
     * @param {?} styles
     */
    function AnimationKeyframeAst(offset, styles) {
        _super.call(this);
        this.offset = offset;
        this.styles = styles;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationKeyframeAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationKeyframe(this, context);
    };
    AnimationKeyframeAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationKeyframeAst.prototype.offset;
        /** @type {?} */
        AnimationKeyframeAst.prototype.styles;
    };
    return AnimationKeyframeAst;
}(AnimationAst));
export var AnimationWithStepsAst = (function (_super) {
    __extends(AnimationWithStepsAst, _super);
    /**
     * @param {?} steps
     */
    function AnimationWithStepsAst(steps) {
        _super.call(this);
        this.steps = steps;
    }
    AnimationWithStepsAst._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AnimationWithStepsAst.prototype.steps;
    };
    return AnimationWithStepsAst;
}(AnimationAst));
export var AnimationGroupAst = (function (_super) {
    __extends(AnimationGroupAst, _super);
    /**
     * @param {?} steps
     */
    function AnimationGroupAst(steps) {
        _super.call(this, steps);
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationGroupAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationGroup(this, context);
    };
    return AnimationGroupAst;
}(AnimationWithStepsAst));
export var AnimationSequenceAst = (function (_super) {
    __extends(AnimationSequenceAst, _super);
    /**
     * @param {?} steps
     */
    function AnimationSequenceAst(steps) {
        _super.call(this, steps);
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    AnimationSequenceAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationSequence(this, context);
    };
    return AnimationSequenceAst;
}(AnimationWithStepsAst));
//# sourceMappingURL=animation_ast.js.map