import { Observable } from '../../Observable';
import { isEmpty } from '../../operator/isEmpty';
Observable.prototype.isEmpty = isEmpty;
