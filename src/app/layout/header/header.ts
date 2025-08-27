import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Favorites } from '../../features/countries/services/country/favorites';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public favorites = inject(Favorites);
}
