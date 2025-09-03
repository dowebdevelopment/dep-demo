export interface DepCountry {
  id: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  isFavorite: boolean;
}

export type CountryFavorite = { isFavorite: boolean };
export type CountryAndFavorite = (DepCountry & CountryFavorite);