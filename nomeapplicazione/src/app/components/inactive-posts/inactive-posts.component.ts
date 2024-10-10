import { Component } from '@angular/core';
import { IJSONresponse } from '../../interfaces/i-jsonresponse';
import { Ipost } from '../../interfaces/ipost';

@Component({
  selector: 'app-inactive-posts',
  templateUrl: './inactive-posts.component.html',
  styleUrl: './inactive-posts.component.scss',
})
export class InactivePostsComponent {
  postsActive: Ipost[] = [];

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
        this.postsActive = dati.posts.filter((post) => post.active === false);
        console.log(this.postsActive);
      })
      .catch((errore) => {
        console.log(errore);
      });
  }
}
