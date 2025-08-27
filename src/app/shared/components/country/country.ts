import { Component, input } from '@angular/core';
import { DepCountry } from '../../../features/countries/models/country';

@Component({
  selector: 'app-country',
  imports: [],
  templateUrl: './country.html',
  styleUrl: './country.scss'
})
export class Country {
  public country = input<DepCountry | undefined>(undefined);
}
