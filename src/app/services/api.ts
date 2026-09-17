import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { SKIP_LOADER } from '../../main';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient);

  loadData() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error(err),
    });
  }

  loadPost() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts', {
        context: new HttpContext().set(SKIP_LOADER, true),
      })
      .subscribe();
  }
}
