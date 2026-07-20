import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book, Search } from '../../interfaces/book';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-find-books',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindBooksComponent implements OnInit {
  books: Book[] = [];
  books$: Observable<Book[]>;

  subscriptions: Subscription[] = [];

  search: Search = { title: '', author: '', genre: '' };

  constructor(private _booksService: BooksService) {
    this.books$ = this._booksService.books.asObservable();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this._booksService.books.subscribe((books) => (this.books = books))
    );
  }

  find() {
    this._booksService.find(this.search);
  }
}
