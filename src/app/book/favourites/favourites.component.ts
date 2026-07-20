import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../interfaces/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  books: Book[];

  constructor(private _bookService: BooksService) {
    this.books = [];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this._bookService.favourites.subscribe((books) => (this.books = books))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe())
  }
}
