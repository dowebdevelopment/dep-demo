import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  public countries: DepCountry[] | undefined = undefined;
  public loading: boolean = false;

  ngOnInit() {
    this.loadCountries();
  }

  private async loadCountries() {
    this.loading = true;
    const countries = await this.countryFetcher.fetchAll().finally(() => {
      this.loading = false;
    });
    if (countries) {
      this.countries = CountryMapper.toDepCountries(countries);
    }
  }
}
