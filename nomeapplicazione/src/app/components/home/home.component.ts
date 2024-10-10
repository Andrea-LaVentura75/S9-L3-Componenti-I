import { Component } from '@angular/core';
import { Ipost } from '../../interfaces/ipost';
import { IJSONresponse } from '../../interfaces/i-jsonresponse';

@Component({
  selector: '.app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  postCasuale: Ipost[] = [];
  ngOnInit() {
    fetch('db.json')
      .then((res) => {
        if (res.ok) {
          return <Promise<IJSONresponse>>res.json();
        } else {
          throw new Error('la risposta del server non è ok');
        }
      })
      .then((dati) => {
        dati.posts.forEach((post: Ipost) => {
          this.arrayPost.push(post); // Aggiunge ogni post all'array
        });
        this.generaPostsCasuali();
        console.log(this.arrayPost);
      })
      .catch((errore) => {
        console.log(errore);
      });
  }

  arrayPost: Ipost[] = [];

  generaPostsCasuali() {
    for (let i: number = 0; i <= 4; i++) {
      if (this.arrayPost.length > 0) {
        let numeroCasuale = Math.floor(Math.random() * this.arrayPost.length);
        this.postCasuale.push(this.arrayPost[numeroCasuale]);
        console.log(this.postCasuale);
      } else {
        console.warn("L'array dei post è vuoto!");
      }
    }
  }
}
