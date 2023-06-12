import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WordsComponent } from './words.component';
import { HistoryComponent } from './history.component';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { StateService } from './state.service';



const bootstrap = function(stateService: StateService){
  return ()=> {
    const state = localStorage.getItem('WordGameAppState')
    if(state){
      stateService.state.set(JSON.parse(state));
    }
  }
  }

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    HistoryComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'', redirectTo: 'words', pathMatch: 'full'},
      {path:'words', component: WordsComponent},
      {path:'history', component: HistoryComponent},
      {path:'settings', component: SettingsComponent}
    ])
  ],
  providers: [provideHttpClient(),
    {provide: APP_INITIALIZER, multi:true, useFactory: bootstrap, deps:[StateService]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
