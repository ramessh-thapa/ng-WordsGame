import { Component, inject } from '@angular/core';
import { GUESS_RESULT, ITry, StateService } from './state.service';
import { WordsService } from './words.service';

@Component({
  selector: 'app-words',
  template: `
   <div> Scoreboard = Correct: {{stateService.state().win_count}}, Incorrect: {{stateService.state().loss_count}} </div>

<div>
  <button class="borderless" *ngFor= "let l of selectedLetters"> {{l}}</button>
  <button (click)="clear()"> clear</button>
</div>
<div class="border-style: none;">
<button (click)="shuffle()"> Shuffle</button>
<button *ngFor= "let l of randomLetters" (click)="selectLetter(l)"> {{l}}</button>
<button (click)= "checkWords()"> Check</button>
</div>
  `,
  styles: [`div{ border: solid; min-width: 400px; height: 60px; margin:10px}
  button{ margin: 10px}

  .borderless{ border-style: none; background-color: white; height: 30px; width: 30px; font-size:18px}
  
  `
  ]
})
export class WordsComponent {
  private wordsService = inject(WordsService);
  stateService = inject(StateService);
  selectedLetters: string[]=[];
  randomLetters: string[]=[];
  constructor(){
    this.randomLetters= this.getRandomLettersArrayOf(this.stateService.state().complexity);
  }


  private getRandomLettersArrayOf(length: number): string[] {
    let result: string[] = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (result.length < length) {
      const letter = characters.charAt(Math.floor(Math.random() * characters.length))
      if (!result.includes(letter)) result.push(letter)
    }
    return result;
  }

  shuffle(){
    this.selectedLetters=[];
    this.randomLetters= this.getRandomLettersArrayOf(this.stateService.state().complexity);
  }

  selectLetter(l:string){
    this.selectedLetters.push(l);

    console.log(this.selectedLetters);
  }

  clear(){
    this.selectedLetters = [];
  }
  // export interface ITry {
  //   word: string;
  //   result: GUESS_RESULT;
  //   timestamp: number;
  // }
  checkWords()
  {
    const word = this.selectedLetters.join("");
    console.log(word);
    this.wordsService.checkWord(word).subscribe(res=>{
      if(res.success ){
        const log={word: word, result: GUESS_RESULT.Correct, timestamp: new Date()};
          if(res.data.valid){
            const state = this.stateService.state();
            state.win_count = state.win_count +1;
            state.logs.push(log)
            this.stateService.state.set(state);
            localStorage.setItem('WordGameAppState',JSON.stringify(state));
          } else{
            log.result = GUESS_RESULT.Incorrect;
            const state = this.stateService.state();
            state.loss_count = state.loss_count +1;
            state.logs.push(log)
            this.stateService.state.set(state);
            localStorage.setItem('WordGameAppState',JSON.stringify(state));
          }
          
          

      } 
    })
  }
}
