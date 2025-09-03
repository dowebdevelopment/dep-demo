import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Country } from '@yusifaliyevpro/countries/types';
import { filter, map } from 'rxjs';
import { CountryItem } from '../../../../shared/components/country/country';
import { FavoritesStore } from '../../../favorites/state/favorites.store';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';

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
  private favoriteStore = inject(FavoritesStore);

  private code = toSignal(this.activatedRoute.paramMap.pipe(
    map((params) => params.get('code')),
    filter(Boolean)
  ));

  public depCountry = computed(() => {
    const c = this.country();
    if (!c) return undefined;
    return CountryMapper.toDepCountry(c, this.favoriteStore.list());
  });
  public loading = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.countryFetcher.fetchByCode(this.code()!).subscribe(country => {
        this.country.set(country);
        this.loading.set(false);
      });
    });
  }

  public toggle(id: string) {
    this.favoriteStore.toggle(id);
  }
}
