export interface DepCountry {
  id: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
}

export type Favorite = {
  isFavorite: boolean;
}

export type CountryAndFavorite = DepCountry & Favorite;