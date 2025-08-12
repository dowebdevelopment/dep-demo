import { Routes } from '@angular/router';
import { Home } from './core/components/home/home';
import { CountryDetail } from './features/countries/pages/country-detail/country-detail';
import { CountryList } from './features/countries/pages/country-list/country-list';

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
    }, 
];
