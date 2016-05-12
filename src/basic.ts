
import {Component, Injectable} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'basic',
  templateUrl: './basic.html',
  directives: [FORM_DIRECTIVES],
})
@Injectable()
export class Basic {
  ctxProp: string;
  constructor() { this.ctxProp = 'initial value'; }
}
