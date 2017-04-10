
import {Component, Injectable} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'basic',
  templateUrl: './basic.ng.html',
})
@Injectable()
export class Basic {
  ctxProp: string;
  constructor() { this.ctxProp = 'happy ' + moment().format('dddd'); }
}
