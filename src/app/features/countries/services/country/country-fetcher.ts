import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Country } from "@yusifaliyevpro/countries/types";

@Injectable({
  providedIn: 'root'
})
export class CountryFetcher {
  private httpClient = inject(HttpClient);

  fetchAll() {
    return this.httpClient.get<Country[]>('https://restcountries.com/v3.1/all?fields=cca3,name,capital,region,subregion,population,area');
  }
  
  fetchByCode(code: string) {
    return this.httpClient.get<Country>(`https://restcountries.com/v3.1/alpha/${code}?fields=cca3,name,capital,region,subregion,population,area`);
  }
}
