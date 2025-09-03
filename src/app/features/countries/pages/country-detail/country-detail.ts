import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Country } from '@yusifaliyevpro/countries/types';
import { filter, map } from 'rxjs';
import { CountryItem } from '../../../../shared/components/country/country';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';
import { FavoriteState } from '../../services/favorites/favorites-state';

@Component({
  selector: 'app-country-detail',
  imports: [CountryItem, RouterLink],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss'
})
export class CountryDetail {
  private country = signal<Country | undefined>(undefined);
  private countryFetcher = inject(CountryFetcher);
  private activatedRoute = inject(ActivatedRoute);
  private code = toSignal(this.activatedRoute.paramMap.pipe(
      map((params) => params.get('code')), 
      filter(Boolean)
  ));
  
  public favoriteState = inject(FavoriteState);
  public loading = signal<boolean>(false);
  public depCountry = computed(() => {
    const c = this.country();
    if (!c) return undefined;
    return CountryMapper.toDepCountry(c, this.favoriteState.list());
  });

  constructor() {
    effect(() => {
      const code = this.code();
      if (!code) return;
      this.countryFetcher.fetchByCode(code).subscribe((country) => {
        this.country.set(country);
      });
    });
  }
}
