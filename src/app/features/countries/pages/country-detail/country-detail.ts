import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs';
import { Country } from '../../../../shared/components/country/country';
import { ToggleFavorite } from '../../../../shared/state/favorites/favorites.actions';
import { FavoritesState } from '../../../../shared/state/favorites/favorites.state';
import { CountryAndFavorite, DepCountry } from '../../models/country';
import { CountryFetcher } from '../../services/country/country-fetcher';
import { CountryMapper } from '../../services/country/country-mapper';

@Component({
  selector: 'app-country-detail',
  imports: [Country, RouterLink],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.scss'
})
export class CountryDetail {
  private countryFetcher = inject(CountryFetcher);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  private country = signal<DepCountry | null>(null);
  private favoriteIds = this.store.selectSignal(FavoritesState.ids);
  private code = toSignal(this.activatedRoute.paramMap.pipe(
    map((params) => params.get('code')),
    filter(Boolean),
  ));
  
  public loading = signal<boolean>(false);
  public countryAndFavorite: Signal<CountryAndFavorite | null> = computed(() => {
    const country = this.country();
    if (!country) return null;
    return {
      ...country,
      isFavorite: this.favoriteIds().includes(this.code()!)
    }
  });

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.countryFetcher.fetchByCode(this.code()!).subscribe((country) => {
        this.country.set(CountryMapper.toDepCountry(country));
        this.loading.set(false);
      });
    });
  }

  public toggleFavorite(id: string) {
    this.store.dispatch(new ToggleFavorite(id));
  }
}
