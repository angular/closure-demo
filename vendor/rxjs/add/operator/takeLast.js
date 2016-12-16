import { Observable } from '../../Observable';
import { takeLast } from '../../operator/takeLast';
Observable.prototype.takeLast = takeLast;
