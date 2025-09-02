import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToggleFavorite } from '../../../favorites/state/favorites.actions';
import { FavoritesState } from '../../../favorites/state/favorites.state';
import { CountryAndFavorite } from '../../models/country';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';
import { SetCountries } from '../../state/countries.actions';
import { CountriesState } from '../../state/countries.state';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss'
})
export class CountryList {
  private store = inject(Store);
  private countryFetcher = inject(CountryFetcher);
  private countries = this.store.selectSignal(CountriesState.getAll);
  private favoriteIds = this.store.selectSignal(FavoritesState.ids);
  
  public loading = signal(false);
  public countriesAndFavorites: Signal<CountryAndFavorite[]> = computed(() =>
    this.countries().map(c => ({
      ...CountryMapper.toDepCountry(c),
      isFavorite: this.favoriteIds().includes(c.cca3),
    }))
  );

  constructor() {
    effect(() => {
      if (this.countries().length > 0 || this.loading()) {
        return;
      }
      this.loading.set(true);
      this.countryFetcher.fetchAll().subscribe((countries) => {
        this.store.dispatch(new SetCountries(countries));
        this.loading.set(false);
      });
    });
  }

  public toggleFavorite(id: string) {
    this.store.dispatch(new ToggleFavorite(id));
  }
}
