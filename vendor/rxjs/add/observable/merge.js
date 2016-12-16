import { Observable } from '../../Observable';
import { merge as mergeStatic } from '../../observable/merge';
Observable.merge = mergeStatic;
