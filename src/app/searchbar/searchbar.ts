import { Component, input, output } from '@angular/core';
import { HaspermissionDirective } from '../directives/haspermission';
import { Debounce } from '../directives/debounce';

@Component({
  selector: 'app-searchbar',
  imports: [HaspermissionDirective, Debounce],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
  standalone: true,
})
export class Searchbar {
  value = input('');

  emitValue = output<string>();

  onChangeValue(value: string) {
    console.log(value);
    this.emitValue.emit(value);
  }
}
