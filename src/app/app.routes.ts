import { Routes } from '@angular/router';
import { Home } from './core/components/home/home';
import { CountryDetail } from './features/countries/pages/country-detail/country-detail';
import { CountryList } from './features/countries/pages/country-list/country-list';
import { Interval } from './shared/components/interval/interval';
import { Rxjs } from './shared/components/rxjs/rxjs';
import { Signals } from './shared/components/signals/signals';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Home
    },
    {
        path: 'countries',
        component: CountryList
    }, {
        path: 'countries/:code',
        component: CountryDetail
    }, {
        path: 'interval',
        component: Interval
    }, {
        path: 'rxjs',
        component: Rxjs
    }, {
        path: 'signals',
        component: Signals
    }
];
