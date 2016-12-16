import { Observable } from '../../Observable';
import { combineLatest as combineLatestStatic } from '../../observable/combineLatest';
Observable.combineLatest = combineLatestStatic;
