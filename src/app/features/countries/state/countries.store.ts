import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Country } from '@yusifaliyevpro/countries/types';

export interface CountriesState { 
  data: Country[];
};

export const CountriesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('countries'),
  withState<CountriesState>({ data: [] }),
  withComputed(({ data }) => ({
    list:  computed(() => [...data()]),
  })),
  withMethods((store) => ({
    set(data: Country[]) {
      patchState(store, { data });
    }
  })),
);
