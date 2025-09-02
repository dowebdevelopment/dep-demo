import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';
import { CountryState } from '../../services/country/country-state';
import { FavoriteState } from '../../services/favorites/favorites-state';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss'
})
export class CountryList {
  private countryFetcher = inject(CountryFetcher);
  private countryState = inject(CountryState);
  
  public favoriteState = inject(FavoriteState);
  public loading = signal(false);
  public countries = computed(() => CountryMapper.toDepCountries(this.countryState.list()));

  ngOnInit() {
    if (this.countryState.list().length === 0) {
      this.loadCountries();
    }
  }

  private async loadCountries() {
    this.loading.set(true);
    this.countryFetcher.fetchAll().subscribe((countries) => {
      this.countryState.setCountries(countries);
      this.loading.set(false);
    });
  }
}
