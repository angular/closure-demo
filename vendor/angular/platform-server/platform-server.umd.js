/**
 * @license AngularJS v$$ANGULAR_VERSION$$
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (factory());
}(this, function () {
    'use strict';
    goog.module('_angular$platform_server');
    // TODO: vsavkin add SERVER_PROVIDERS and SERVER_APP_PROVIDERS
    var parse5_adapter_1 = goog.require('_angular$platform_server$src$parse5__adapter');
    exports.Parse5DomAdapter = parse5_adapter_1.Parse5DomAdapter;
}));
