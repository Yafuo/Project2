import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import { TopPanelComponent } from './top-panel/top-panel.component';

@NgModule({
  declarations: [
    HomeComponent,
    TopPanelComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule { }
