import { Country } from '@yusifaliyevpro/countries/types';

export class SetCountries {
    static readonly type = '[Countries] Set';
    constructor(readonly countries: Country[]) { }
}