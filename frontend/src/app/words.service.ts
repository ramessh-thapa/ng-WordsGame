import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  private http = inject(HttpClient);

  checkWord(word: string){
    return this.http.get<IResponse>(env.SERVER_URL+'check/'+ word)
   }
}


export interface IResponse{
  "success": boolean,
  "data": {
    "valid": boolean
  }
}