
import 'moment';

import {Component, Injectable} from '@angular/core';
import * as moment_type from 'moment';
declare var moment: typeof moment_type;

@Component({
  selector: 'basic',
  templateUrl: './basic.ng.html',
})
@Injectable()
export class Basic {
  ctxProp: string;
  constructor() {
    this.ctxProp = `Happy ${moment().format('dddd')}`;
  }
}
