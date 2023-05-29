import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    country: ['', Validators.required ],
    borders: ['', Validators.required ],
  })

  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[]=[]

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged()
  }

  get regions():Region[]{
    return this.countriesService.regions;
  }

  onRegionChanged():void{
    this.myForm.get('region')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('country')!.setValue('') ),
        switchMap( region => this.countriesService.getCountriesByRegion(region) )
      )
      .subscribe( countries => this.countriesByRegion = countries )
  }

  onCountryChanged(){
    this.myForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.myForm.get('borders')!.setValue('') ),
        filter( (value: string) => value.length > 0 ),
        switchMap( alpha => this.countriesService.getCountrieByAlphaCode(alpha) ),
        switchMap( country => this.countriesService.getCountryBordersByCodes(country.borders) )
      )
      .subscribe( countries => this.borders = countries )
  }

}
