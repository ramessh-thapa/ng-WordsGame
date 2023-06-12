import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StateService } from './state.service';

@Component({
  selector: 'app-settings',
  template: `
  <p> Change the game complexity by changing the number of letters:</p>
  <form [formGroup]="form">
  <input type="number" (ngModelChange)="changeComplexity($event)" formControlName ="complexity" min="3" max="26">
  
  </form>
  `,
  styles: [
  ]
})

// <div *ngIf="complexity.invalid && (complexity.dirty || complexity.touched)">
//     <div *ngIf="complexity.required">Quantity is required.</div>
//     <div *ngIf="complexity.min">Minimum value allowed is 3.</div>
//     <div *ngIf="complexity.max">Maximum value allowed is 26.</div>
//   </div>
export class SettingsComponent {
  stateService = inject(StateService);
  form = inject(FormBuilder).group({
    complexity: [0, Validators.required]
  })
  data: number = 0;

  constructor()
  {
    this.data = this.stateService.state().complexity;
    this.form.get('complexity')?.patchValue(this.data);
  }

  changeComplexity(e:number){
    const state = this.stateService.state();
    console.log(state)
    if(e && e !== state.complexity)
    {
      state.complexity = e;
      this.stateService.state.set(state);
      localStorage.setItem('WordGameAppState',JSON.stringify(state));
    }
  }
}
