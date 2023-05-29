import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, from, map, of, tap } from 'rxjs';

import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _region:Region[] = [ Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania ];
  private serviceUrl: string = 'https://restcountries.com/v3.1';

  constructor(
    /* importar  el HttpClientModule en el app.module.ts */
    private http: HttpClient
  ) { }

  get regions():Region[]{
    return [ ...this._region];
  }

  getCountriesByRegion( region:Region ):Observable<SmallCountry[]>{

    if(!region) return of([])

    const url:string = `${this.serviceUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.map ( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }) ) ),
      )
  }

  getCountrieByAlphaCode( alphacode:string):Observable<SmallCountry>{

    const url:string = `${this.serviceUrl}/alpha/${alphacode}?fields=cca3,name,borders`

    return this.http.get<Country>(url)
      .pipe(
        map( country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      )
  }

  getCountryBordersByCodes( bordes:string[]):Observable<SmallCountry[]> {

    if( !bordes || bordes.length === 0 ) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = []

    bordes.forEach( code => {
      const request = this.getCountrieByAlphaCode(code)
      countriesRequest.push(request)
    })

    return combineLatest(countriesRequest)
    // el combineLatest es como el promiseAll, ejecuta un arreglo de observables de manera simultanea

  }

}
