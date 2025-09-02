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
    public toggle(store: StateContext<FavoritesStateModel>, action: ToggleFavorite) {
        const ids = store.getState().ids;
        const next = ids.includes(action.id) ? ids.filter(x => x !== action.id) : [...ids, action.id];
        store.patchState({ ids: next });
    }

}
