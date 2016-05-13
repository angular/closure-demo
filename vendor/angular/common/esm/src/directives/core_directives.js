goog.module('_angular$common$src$directives$core__directives');
var ng_class_1 = goog.require('_angular$common$src$directives$ng__class');
var ng_for_1 = goog.require('_angular$common$src$directives$ng__for');
var ng_if_1 = goog.require('_angular$common$src$directives$ng__if');
var ng_template_outlet_1 = goog.require('_angular$common$src$directives$ng__template__outlet');
var ng_style_1 = goog.require('_angular$common$src$directives$ng__style');
var ng_switch_1 = goog.require('_angular$common$src$directives$ng__switch');
var ng_plural_1 = goog.require('_angular$common$src$directives$ng__plural');
/**
 * A collection of Angular core directives that are likely to be used in each and every Angular
 * application.
 *
 * This collection can be used to quickly enumerate all the built-in directives in the `directives`
 * property of the `@Component` annotation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/yakGwpCdUkg0qfzX5m8g?p=preview))
 *
 * Instead of writing:
 *
 * ```typescript
 * import {NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from '@angular/common';
 * import {OtherDirective} from './myDirectives';
 *
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'myComponent.html',
 *   directives: [NgClass, NgIf, NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault, OtherDirective]
 * })
 * export class MyComponent {
 *   ...
 * }
 * ```
 * one could import all the core directives at once:
 *
 * ```typescript
 * import {CORE_DIRECTIVES} from '@angular/common';
 * import {OtherDirective} from './myDirectives';
 *
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'myComponent.html',
 *   directives: [CORE_DIRECTIVES, OtherDirective]
 * })
 * export class MyComponent {
 *   ...
 * }
 * ```
 */
exports.CORE_DIRECTIVES = [
    ng_class_1.NgClass,
    ng_for_1.NgFor,
    ng_if_1.NgIf,
    ng_template_outlet_1.NgTemplateOutlet,
    ng_style_1.NgStyle,
    ng_switch_1.NgSwitch,
    ng_switch_1.NgSwitchWhen,
    ng_switch_1.NgSwitchDefault,
    ng_plural_1.NgPlural,
    ng_plural_1.NgPluralCase
];
//# sourceMappingURL=core_directives.js.map