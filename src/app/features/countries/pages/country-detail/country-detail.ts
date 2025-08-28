import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { Country } from '../../../../shared/components/country/country';
import { FavoritesStore } from '../../../favorites/state/favorites.store';
import { DepCountry } from '../../models/country';
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
  private favoriteStore = inject(FavoritesStore);

  private country = signal<DepCountry | undefined>(undefined);
  private code = toSignal(this.activatedRoute.paramMap.pipe(
    map((params) => params.get('code')),
    filter(Boolean)
  ));

  public loading = signal<boolean>(false);
  public countryAndFavorite = computed(() => {
    const country = this.country();
    if (!country) {
      return undefined;
    }
    return {
      ...country,
      isFavorite: this.favoriteStore.isFavorite(country.id)
    };
  });

  constructor() {
    effect(() => {
      this.loading.set(true);
      this.countryFetcher.fetchByCode(this.code()!).subscribe(country => {
        this.country.set(CountryMapper.toDepCountry(country));
        this.loading.set(false);
      });
    });
  }

  public toggle(id: string) {
    this.favoriteStore.toggle(id);
  }
}
