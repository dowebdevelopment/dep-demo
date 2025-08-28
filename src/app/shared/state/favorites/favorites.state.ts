import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToggleFavorite } from './favorites.actions';

export interface FavoritesStateModel {
    ids: string[];
}

@State<FavoritesStateModel>({
    name: 'favorites',
    defaults: {
        ids: []
    }
})
@Injectable()
export class FavoritesState {

    @Selector() 
    public static ids(s: FavoritesStateModel) { 
        return s.ids;
    }

    @Selector([FavoritesState.ids])
    public static count(ids: string[]) { 
        return ids.length; 
    }

    @Action(ToggleFavorite)
    public toggle(helpers: StateContext<FavoritesStateModel>, action: ToggleFavorite) {
        const ids = helpers.getState().ids;
        const next = ids.includes(action.id) ? ids.filter(x => x !== action.id) : [...ids, action.id];
        helpers.patchState({ ids: next });
    }

}
