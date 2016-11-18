
import {platformBrowser} from '@angular/platform-browser/index';
import {AppModuleNgFactory} from './app.module.ngfactory';
import {Basic} from './basic';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
