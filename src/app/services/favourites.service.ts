import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FavouriteItem } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private _favourites:FavouriteItem[]=[];
  favourites$: BehaviorSubject<FavouriteItem[]> = new BehaviorSubject<FavouriteItem[]>([])

  constructor() {
    this._favourites = JSON.parse(localStorage.getItem('favouriteBooks')!) || [];
    this.favourites$.next(this._favourites);
  }

  private refresh() {
    this.favourites$.next(this._favourites);
    setTimeout(() => {
      localStorage.setItem('favouriteBooks', JSON.stringify(this._favourites));
    }, 0);
  }

  public isFavourite(id: number): boolean {
    let item:FavouriteItem | null = this.findById(id);
    return item ? item.favourite : false;
  }

  setFavourite(id: number, note: string  = '') {
    let item = this.findById(id);
    if (item) {
      item.favourite = true;
      if (note) {
        item.note = note
      }
    }
    this.refresh()
  }

  removeFavourite(id:number) {
    let item = this.findById(id);
    if (item) {
      item.favourite = false;
    }
    this.refresh()
  }

  toggleFavourite(id:number) {
    // console.log(entities);
    let item = this.findById(id);
    if (item) {
      item.favourite = !item.favourite;
    } else {
      this._favourites.push({
        'id': id,
        'favourite': true,
        'note': ''
      });
    }
    this.refresh()
  }

  findById(id:number): FavouriteItem | null {
    return this._favourites.find(e => e.id === id) ?? null;
  }


}

