import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoriteState } from '../../features/countries/services/favorites/favorites-state';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public favoriteState = inject(FavoriteState);
}
