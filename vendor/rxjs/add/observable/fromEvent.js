import { Observable } from '../../Observable';
import { fromEvent as staticFromEvent } from '../../observable/fromEvent';
Observable.fromEvent = staticFromEvent;
