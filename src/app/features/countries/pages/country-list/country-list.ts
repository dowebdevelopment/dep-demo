import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesStore } from '../../../favorites/state/favorites.store';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';
import { CountriesStore } from '../../state/countries.store';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss'
})
export class CountryList {
  private countryFetcher = inject(CountryFetcher);
  private countriesStore = inject(CountriesStore);
  private favoritesStore = inject(FavoritesStore);
  
  public loading = signal(false);
  public countries = computed(() => {
    return CountryMapper.toDepCountries(this.countriesStore.data()).map(country => ({
      ...country,
      isFavorite: this.favoritesStore.isFavorite(country.id)
    }));
  });

  constructor() {
    effect(() => {
      if (this.countries().length > 0 || this.loading()) {
        return;
      }
      this.loading.set(true);
      this.countryFetcher.fetchAll().subscribe((countries) => {
        this.countriesStore.set(countries);
        this.loading.set(false);
      });
    })
  }

  public toggle(id: string) {
    this.favoritesStore.toggle(id);
  }
}
