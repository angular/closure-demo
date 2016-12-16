import { Observable } from '../../Observable';
import { onErrorResumeNextStatic } from '../../operator/onErrorResumeNext';
Observable.onErrorResumeNext = onErrorResumeNextStatic;
