import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { FavoritesState } from '../../state/favorites.state';

@Component({
  selector: 'app-favorite-list',
  imports: [RouterLink],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteList {
  private store = inject(Store);

  public countries = this.store.selectSignal(FavoritesState.ids);
}
