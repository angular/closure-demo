import { Observable } from '../../Observable';
import { auditTime } from '../../operator/auditTime';
Observable.prototype.auditTime = auditTime;
