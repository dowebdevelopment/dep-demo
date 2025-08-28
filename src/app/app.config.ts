import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { CountriesState } from './shared/state/countries/countries.state';
import { FavoritesState } from './shared/state/favorites/favorites.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()), provideStore(
      [FavoritesState, CountriesState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsRouterPlugin()
    ),
  ]
};
