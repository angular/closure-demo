import {Component, Injectable} from '@angular/core';

@Component({
  selector: 'basic',
  templateUrl: './basic.ng.html',
})
@Injectable()
export class Basic {
  ctxProp: string;
  constructor() {
    this.ctxProp = `Hello World`;
  }
}
