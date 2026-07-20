export interface Book {
  id?: number;
  isbn: string;
  title: string;
  price: number | string;
  url_cover: string;
  author?: string;
  genre?: string;
  favourite?: boolean;
  note?: string;
}

export interface FavouriteItem {
  id: number;
  favourite: boolean;
  note: string;
}

export interface Search {
  title: string;
  author: string;
  genre: string;
}
