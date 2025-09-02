import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoriteState } from '../../../countries/services/favorites/favorites-state';

@Component({
  selector: 'app-favorite-list',
  imports: [RouterLink],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteList {
  private favoriteState = inject(FavoriteState)
  public countries = this.favoriteState.list;
}
