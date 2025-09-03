import { Injectable } from '@angular/core';
import { Country } from '@yusifaliyevpro/countries/types';
import { DepCountry } from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryMapper {
  public static toDepCountry(country: Country, favorites: string[]): DepCountry {
    return {
      id: country.cca3,
      name: country.name.common,
      capital: country.capital?.join(', ') || 'Unknown',
      region: country.region,
      subregion: country.subregion || 'Unknown',
      population: country.population,
      area: country.area,
      isFavorite: favorites.includes(country.cca3)
    };

    // Or keep all properties from Country and extend with custom ones
    // return {
    //   ...country,
    //   id: country.cca3,
    //   name: country.name.common,
    // };
  }

  public static toDepCountries(countries: Country[], favorites: string[]): DepCountry[] {
    return countries.map(country => CountryMapper.toDepCountry(country, favorites));
  }
}
