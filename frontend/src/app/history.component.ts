import { Component, inject } from '@angular/core';
import { GUESS_RESULT, INITIAL_STATE, ITry, StateService } from './state.service';

@Component({
  selector: 'app-history',
  template: `
  <table>
  <thead>
    <tr>
      <th>Word</th>
      <th>Result</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of stateService.state().logs" [ngStyle]="getStyle(item)">
     <td>{{ item.word }}</td>
      <td>{{ item.result }}</td>
      <td>{{ item.timestamp | date}}</td>
    </tr>
  </tbody>
  <button (click)="clearHistory()">clear history</button>
      </table>
  `,
  styles: [
  ]
})

export class HistoryComponent {
  Game_result = GUESS_RESULT;
  stateService = inject(StateService);
  data: any[]=[];
  constructor()
  {
    this.data = this.stateService.state().logs;
  }

  clearHistory(){
    const comp = this.stateService.state().complexity;
    this.stateService.state.set(INITIAL_STATE);
    localStorage.clear();
   const state = this.stateService.state();
    if( comp !== INITIAL_STATE.complexity)
    {
      state.complexity = comp;
      this.stateService.state.set(state);
      
      localStorage.setItem('WordGameAppState',JSON.stringify(state));
    }
   //testing to push in git
  }
  getStyle(item:ITry){
   if(item.result == this.Game_result.Correct)
   {
    return { 'background-color': 'green' };
  } else {
    return { 'background-color': 'red' };
  }

  }

}
