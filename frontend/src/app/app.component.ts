import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <a [routerLink]="['', 'words']"> Words Game</a>
  <a [routerLink]="['', 'history']"> History</a>
  <a [routerLink]="['', 'settings']"> Settings</a>
  <router-outlet/>
  `,
  styles: [`a{margin: 10px}`]
})
export class AppComponent {
  title = 'frontend';
}
