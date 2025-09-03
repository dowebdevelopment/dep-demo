import { computed, Injectable, signal } from '@angular/core';
import { Country } from '@yusifaliyevpro/countries/types';

@Injectable({
  providedIn: 'root'
})
export class CountryState {
  private countries = signal<Set<Country>>(new Set());
  
  public list = computed(() => [...this.countries()]);

  public setCountries(countries: Country[]): void {
    this.countries.set(new Set(countries));
  }
}