import { Observable } from '../../Observable';
import { audit } from '../../operator/audit';
Observable.prototype.audit = audit;
