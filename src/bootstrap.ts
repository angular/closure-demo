import {coreBootstrap, ReflectiveInjector} from '@angular/core';
import {browserPlatform, BROWSER_APP_COMMON_PROVIDERS} from '@angular/platform-browser';
import {BasicNgFactory} from './basic.ngfactory';
import {Basic} from './basic';

const appInjector =
    ReflectiveInjector
    .resolveAndCreate(BROWSER_APP_COMMON_PROVIDERS, browserPlatform().injector);
coreBootstrap(appInjector, BasicNgFactory);