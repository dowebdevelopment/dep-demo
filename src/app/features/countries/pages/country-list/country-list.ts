import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesStore } from '../../../favorites/state/favorites.store';
import { DepCountry } from '../../models/country';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink],
  templateUrl: './country-list.html',
  styleUrl: './country-list.scss'
})
export class CountryList {
  private countryFetcher = inject(CountryFetcher);
  
  public store = inject(FavoritesStore);
  public countries = signal<DepCountry[]>([]);
  public loading = signal(false);

  ngOnInit() {
    this.loadCountries();
  }

  private async loadCountries() {
    this.loading.set(true);
    this.countryFetcher.fetchAll().subscribe((countries) => {
      this.countries.set(CountryMapper.toDepCountries(countries));
      this.loading.set(false);
    });
  }
}
