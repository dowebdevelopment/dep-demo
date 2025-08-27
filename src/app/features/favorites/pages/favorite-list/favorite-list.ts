import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Favorites } from '../../../countries/services/country/favorites';

@Component({
  selector: 'app-favorite-list',
  imports: [RouterLink],
  templateUrl: './favorite-list.html',
  styleUrl: './favorite-list.scss'
})
export class FavoriteList {
  private favorites = inject(Favorites)
  public countries = this.favorites.list;
}
