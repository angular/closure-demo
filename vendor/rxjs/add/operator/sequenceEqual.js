import { Observable } from '../../Observable';
import { sequenceEqual } from '../../operator/sequenceEqual';
Observable.prototype.sequenceEqual = sequenceEqual;
