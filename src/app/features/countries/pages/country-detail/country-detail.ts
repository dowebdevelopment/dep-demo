import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
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
  private destroyRef = inject(DestroyRef);

  public store = inject(FavoritesStore);
  public loading = signal<boolean>(false);
  public country = signal<DepCountry | undefined>(undefined);

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map((params) => params.get('code')), 
      filter(Boolean),
      switchMap((code) => this.countryFetcher.fetchByCode(code)),
      filter(Boolean),
      map((country) => CountryMapper.toDepCountry(country)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((country) => {
      this.country.set(country);
    });
  }
}
