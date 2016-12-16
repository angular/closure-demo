import { Observable } from '../../../Observable';
import { ajax as staticAjax } from '../../../observable/dom/ajax';
Observable.ajax = staticAjax;
