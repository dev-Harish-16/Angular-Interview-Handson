import { Component, inject, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Searchbar } from './app/searchbar/searchbar';
import {
  withInterceptors,
  provideHttpClient,
  HttpContextToken,
} from '@angular/common/http';
import { loadingInterceptor } from './app/interceptors/loading-interceptor';
import { Api } from './app/services/api';
import { Loader } from './app/services/loader';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const SKIP_LOADER = new HttpContextToken(() => false);
@Component({
  selector: 'app-root',
  template: `
    <h1>Hello from {{ name }}!</h1>
    
    <h3>{{searchTerm()}}</h3>
    <app-searchbar (emitValue)="getValue($event)"></app-searchbar>

    <button (click)=getDetails()>get api details</button>
    <button (click)=skip()>skip loader</button>
    @if (loaderService.isShow()) {
  <div class="loader-overlay">
  <div class="spinner"></div>
  </div>
}
  `,
  imports: [Searchbar, MatProgressSpinnerModule],
})
export class App {
  name = 'Angular';
  counter = signal(0);

  searchTerm = signal('');

  private readonly apiService = inject(Api);
  protected readonly loaderService = inject(Loader);
  getValue(value: string) {
    this.searchTerm.set(value);
  }

  getDetails() {
    this.apiService.loadData();
  }

  skip() {
    this.apiService.loadPost();
  }
}

bootstrapApplication(App, {
  providers: [provideHttpClient(withInterceptors([loadingInterceptor]))],
});
