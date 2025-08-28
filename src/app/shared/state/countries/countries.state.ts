import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
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

    public static getCountry(id: string) {
        return createSelector([CountriesState.getAll], (items: Country[]) => items.find(country => country.cca3 === id));
    }
    
    public static hasCountries() {
        return createSelector([CountriesState.getAll], (items: Country[]) => items.length > 0);
    }

    @Action(SetCountries)
    public setCountries(ctx: StateContext<CountriesStateModel>, action: SetCountries) {
        ctx.patchState({
            items: action.countries
        });
    }
}
