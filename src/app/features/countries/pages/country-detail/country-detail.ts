import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Country } from '../../../../shared/components/country/country';
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

  // public country$!: Observable<DepCountry | undefined>;
  public params = toSignal(this.activatedRoute.paramMap);
  public code = computed(() => this.params()?.get('code') || '');
  public country = toSignal(
    toObservable(this.code).pipe(
      switchMap((code) => this.countryFetcher.fetchByCode$(code)), 
      map((country) => CountryMapper.toDepCountry(country))
  ));
  
  // public country = this.activatedRoute.paramMap.pipe(
  //   map((params) => params.get('code')),
  //   filter((value) => value !== null),
  //   switchMap((code) => this.countryFetcher.fetchByCode$(code)),
  //   map((value) => CountryMapper.toDepCountry(value)),
  // );

  // constructor() {
  //   effect(() => {
  //     const code = this.code();
  //     if (code) {
  //       this.countryFetcher.fetchByCode$(code).pipe(
  //         map((country) => CountryMapper.toDepCountry(country))
  //       ).subscribe((value) => {
  //         this.country.set(value);
  //       });
  //     }
  //   });
  // }

  // ngOnInit() {
  //   // this.loadCountry();
  // }  

  // private async loadCountry() {
  //   const code = this.activatedRoute.snapshot.paramMap.get('code');
  //   if (!code) {
  //     console.error('Country code is missing');
  //     return;
  //   }

  //   this.country$ = this.countryFetcher.fetchByCode$(code).pipe(
  //     map((country) => CountryMapper.toDepCountry(country))
  //   );

  //   // this.country$.subscribe((country) => this.country.set(country));
  //   // this.country = toSignal(this.country$);
  // }
}
