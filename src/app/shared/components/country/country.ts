import { Component, Input } from '@angular/core';
import { DepCountry } from '../../../countries/models/country';

@Component({
  selector: 'app-country',
  imports: [],
  templateUrl: './country.html',
  styleUrl: './country.scss'
})
export class Country {
  @Input()
  public country!: DepCountry;
}
