import { Observable } from '../../Observable';
import { pluck } from '../../operator/pluck';
Observable.prototype.pluck = pluck;
