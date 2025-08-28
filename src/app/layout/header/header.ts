import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { FavoritesState } from '../../shared/state/favorites/favorites.state';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private store = inject(Store); 
  public count = this.store.selectSignal(FavoritesState.count);
}
