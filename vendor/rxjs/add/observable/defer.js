import { Observable } from '../../Observable';
import { defer as staticDefer } from '../../observable/defer';
Observable.defer = staticDefer;
