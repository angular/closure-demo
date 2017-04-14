
import 'moment';

import {Component, Injectable} from '@angular/core';

declare var moment: any;

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
