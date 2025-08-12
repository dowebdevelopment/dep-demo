import { Injectable } from '@angular/core';
import { Country } from '@yusifaliyevpro/countries/types';
import { DepCountry } from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryMapper {
  public static toDepCountry(country: Country): DepCountry {
    return {
      id: country.cca3,
      name: country.name.common,
      capital: country.capital?.join(', ') || 'Unknown',
      region: country.region,
      subregion: country.subregion || 'Unknown',
      population: country.population,
      area: country.area
    };

    // Or keep all properties from Country and extend with custom ones
    // return {
    //   ...country,
    //   id: country.cca3,
    //   name: country.name.common,
    // };
  }

  public static toDepCountries(countries: Country[]): DepCountry[] {
    return countries.map(country => CountryMapper.toDepCountry(country));
  }
}
