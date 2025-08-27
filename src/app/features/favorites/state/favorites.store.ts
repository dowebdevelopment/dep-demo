import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export type FavoritesState = { ids: Set<string> };

export const FavoritesStore = signalStore(
  { providedIn: 'root' },
  withState<FavoritesState>({ ids: new Set([]) }),
  withComputed(({ ids }) => ({
    count: computed(() => ids().size),
    list:  computed(() => [...ids()]),
  })),
  withMethods((store) => ({
    toggle(id: string) {
      const next = new Set(store.ids());
      next.has(id) ? next.delete(id) : next.add(id);
      patchState(store, { ids: next });
    },
    isFavorite(id: string) {
      return store.ids().has(id);
    }
  })),
);
