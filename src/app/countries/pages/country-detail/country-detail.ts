import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../../shared/components/country/country';
import { DepCountry } from '../../models/country';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';

@Component({
  selector: 'app-country-detail',
  imports: [Country],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss'
})
export class CountryDetail {
  private countryFetcher = inject(CountryFetcher);
  private activatedRoute = inject(ActivatedRoute);

  public country: DepCountry | undefined = undefined;
  public loading: boolean = false;

  // Alternatively, if you want to use the observable method:
  // public country$!: Observable<DepCountry[]>;

  ngOnInit() {
    this.loadCountry();
  }

  private async loadCountry() {
    const code = this.activatedRoute.snapshot.paramMap.get('code');
    if (!code) {
      console.error('Country code is missing');
      return;
    }

    this.loading = true;
    const country = await this.countryFetcher.fetchByCode(code).finally(() => {
      this.loading = false;
    });
    if (country) {
      this.country = CountryMapper.toDepCountry(country);
    }

    // Alternatively, if you want to use the observable method:
    // this.countryFetcher.fetchByCode$(code).subscribe((country) => {
    //   this.loading = false;
    //   this.country = country;
    // });

    // Or better yet, use the async pipe in the template
    // this.country$ = this.countryFetcher.fetchByCode$(code);
    // @if (country$ | async; as country) {
    //   {{ country }}
    // } @else {
    //   Loading...
    // }
  }
}
