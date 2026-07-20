import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://openlibrary.org/subjects/love.json?details=true';
  public data: Book[] = [];

  constructor(private http: HttpClient) {
    this.getBooks().subscribe(response => {
      if (response && response.works) {
        this.data = response.works.map((work: any, index: number) => {
          return {
            id: index + 1,
            isbn: work.key || '',
            title: work.title || 'Sin Título',
            price: 1500,
            url_cover: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg` : '',
            author: work.authors && work.authors.length > 0 ? work.authors[0].name : 'Autor Desconocido',
            genre: 'Amor / Romántico',
            favourite: false,
            note: ''
          };
        });
      }
    });
  }

  getBooks(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
