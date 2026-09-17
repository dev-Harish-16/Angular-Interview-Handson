import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loader {
  isShow = signal(false);
  show() {
    this.isShow.set(true);
  }

  hide() {
    this.isShow.set(false);
  }
}
