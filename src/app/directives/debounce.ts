import {
  Directive,
  HostListener,
  output,
  input,
  inject,
  DestroyRef,
  OnInit,
  ElementRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';

@Directive({
  selector: '[appDebounce]',
})
export class Debounce implements OnInit {
  debounceMs = input<number>(300);
  debounced = output<string>();

  private readonly el = inject(ElementRef<HTMLInputElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'input')
      .pipe(
        map((event: any) => (event.target as HTMLInputElement).value),
        debounceTime(this.debounceMs()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => this.debounced.emit(value));
  }
}
