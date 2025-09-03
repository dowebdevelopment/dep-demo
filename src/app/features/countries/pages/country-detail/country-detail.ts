import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Country } from '@yusifaliyevpro/countries/types';
import { filter, map } from 'rxjs';
import { CountryItem } from '../../../../shared/components/country/country';
import { ToggleFavorite } from '../../../favorites/state/favorites.actions';
import { FavoritesState } from '../../../favorites/state/favorites.state';
import { DepCountry } from '../../models/country';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';

@Component({
  selector: 'app-country-detail',
  imports: [CountryItem, RouterLink],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss'
})
export class CountryDetail {
  private countryFetcher = inject(CountryFetcher);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  private country = signal<Country | null>(null);
  private favoriteIds = this.store.selectSignal(FavoritesState.ids);
  private code = toSignal(this.activatedRoute.paramMap.pipe(
    map((params) => params.get('code')),
    filter(Boolean),
  ));
  
  public loading = signal<boolean>(false);
  public depCountry: Signal<DepCountry | null> = computed(() => {
    const country = this.country();
    if (!country) return null;
    return CountryMapper.toDepCountry(country, this.favoriteIds());
  });

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.countryFetcher.fetchByCode(this.code()!).subscribe((country) => {
        this.country.set(country);
        this.loading.set(false);
      });
    });
  }

  public toggleFavorite(id: string) {
    this.store.dispatch(new ToggleFavorite(id));
  }
}
