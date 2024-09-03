import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() searchEmit: EventEmitter<string> = new EventEmitter()

  search(event: Event) {
    const input = event.target as HTMLInputElement
    const word = input.value
    this.searchEmit.emit(word)

  }
}
