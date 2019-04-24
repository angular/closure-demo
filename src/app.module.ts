import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Basic} from './basic';

@NgModule({
  declarations: [Basic],
  bootstrap: [Basic],
  imports: [BrowserModule],
})
export class AppModule {
}
