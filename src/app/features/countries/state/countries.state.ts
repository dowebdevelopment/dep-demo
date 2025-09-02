import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Country } from '@yusifaliyevpro/countries/types';
import { SetCountries } from './countries.actions';

export interface CountriesStateModel {
    items: Country[];
}

@State<CountriesStateModel>({
    name: 'countries',
    defaults: {
        items: []
    }
})
@Injectable()
export class CountriesState {

    @Selector()
    public static getAll(state: CountriesStateModel) {
        return state.items;
    }

    @Action(SetCountries)
    public setCountries(store: StateContext<CountriesStateModel>, action: SetCountries) {
        store.patchState({
            items: action.countries
        });
    }
}
