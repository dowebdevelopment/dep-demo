import { Component, input } from '@angular/core';
import { CountryAndFavorite } from '../../../features/countries/models/country';

@Component({
  selector: 'app-country',
  imports: [],
  templateUrl: './country.html',
  styleUrl: './country.scss'
})
export class CountryItem {
  public country = input<CountryAndFavorite | undefined>(undefined);
}
