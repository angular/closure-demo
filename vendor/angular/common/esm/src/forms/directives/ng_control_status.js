goog.module('_angular$common$src$forms$directives$ng__control__status');
var core_1 = goog.require('_angular$core');
var ng_control_1 = goog.require('_angular$common$src$forms$directives$ng__control');
var lang_1 = goog.require('_angular$common$src$facade$lang');
class NgControlStatus {
    /**
     * @param {?} cd
     */
    constructor(cd) {
        this._cd = cd;
    }
    get ngClassUntouched() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.untouched : false;
    }
    get ngClassTouched() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.touched : false;
    }
    get ngClassPristine() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.pristine : false;
    }
    get ngClassDirty() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.dirty : false;
    }
    get ngClassValid() {
        return lang_1.isPresent(this._cd.control) ? this._cd.control.valid : false;
    }
    get ngClassInvalid() {
        return lang_1.isPresent(this._cd.control) ? !this._cd.control.valid : false;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        NgControlStatus.prototype._cd;
    }
}
/** @nocollapse */ NgControlStatus.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[ngControl],[ngModel],[ngFormControl]',
                host: {
                    '[class.ng-untouched]': 'ngClassUntouched',
                    '[class.ng-touched]': 'ngClassTouched',
                    '[class.ng-pristine]': 'ngClassPristine',
                    '[class.ng-dirty]': 'ngClassDirty',
                    '[class.ng-valid]': 'ngClassValid',
                    '[class.ng-invalid]': 'ngClassInvalid'
                }
            },] },
];
/** @nocollapse */ NgControlStatus.ctorParameters = [
    { type: ng_control_1.NgControl, decorators: [{ type: core_1.Self },] },
];
exports.NgControlStatus = NgControlStatus;
//# sourceMappingURL=ng_control_status.js.map