import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import {
  rootReducer as reducer
} from './app.reducer';

import { AppComponent } from './app.component';
import { ViewComponents } from './views';
import { FromNowPipe } from './pipes';

@NgModule({
  declarations: [
    AppComponent
    , ViewComponents
    , FromNowPipe
  ],
  imports: [
    BrowserModule
    , FormsModule
    , HttpClientModule
    , StoreModule.forRoot(reducer)
    , StoreDevtoolsModule.instrument({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
