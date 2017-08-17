import 'zone.js/dist/zone'; // fix for closure build; including 'zone.js' confuses closure and breaks the build

import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from './app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
