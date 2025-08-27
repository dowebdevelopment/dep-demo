import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesStore } from '../../features/favorites/state/favorites.store';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public store = inject(FavoritesStore);
}
