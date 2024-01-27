import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  Subscription,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchField', { read: ElementRef })
  private _searchField!: ElementRef<HTMLInputElement>;

  @Output() searchEvent = new EventEmitter<string>();

  #searchSub!: Subscription;
  #userTypedText: WritableSignal<string> = signal('');

  ngAfterViewInit(): void {
    if (!this.#searchSub && this._searchField) {
      this.#searchSub = combineLatest({
        input: fromEvent<KeyboardEvent>(
          this._searchField.nativeElement,
          'input'
        ).pipe(
          map((event: KeyboardEvent) => {
            // console.log('search event', event);
            return (event.target as HTMLInputElement).value;
          }),
          debounceTime(700),
          distinctUntilChanged()
        ),
        // isEnterKey: fromEvent(this._searchField.nativeElement, 'keyup').pipe(
        //   map((e) => (e as KeyboardEvent).key === 'Enter')
        // ),
      }).subscribe(({ input }) => {
        // console.log('search text', input, 'keyup', isEnterKey);
        this.#userTypedText.set(input || '');

        // if (isEnterKey) {
        this.onSubmitText();
        // }
      });
    }
  }

  onSubmitText(): void {
    this.searchEvent.emit(this.#userTypedText());
  }

  ngOnDestroy(): void {
    this.#searchSub?.unsubscribe();
  }
}
