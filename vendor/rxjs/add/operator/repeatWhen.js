import { Observable } from '../../Observable';
import { repeatWhen } from '../../operator/repeatWhen';
Observable.prototype.repeatWhen = repeatWhen;
