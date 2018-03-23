import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Flight } from '@flight-workspace/flight-api';
import { debounce, debounceTime, switchMap, tap, startWith, map, distinctUntilChanged, combineLatest, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css']
})
export class FlightLookaheadComponent implements OnInit {

  control: FormControl = new FormControl();
  
  valueChanges$: Observable<string> = this.control.valueChanges; // Quelle
  flights$: Observable<Flight[]>; // Senke

  online: boolean = false;
  online$: Observable<boolean>;

  loading: boolean = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    this.online$ 
      = interval(2000).pipe(
              startWith(0),
              map(x => Math.random() < 0.5),
              distinctUntilChanged(),
              tap(x => this.online = x)
      );

    this.flights$ = this.valueChanges$.pipe(
      debounceTime(300),
      combineLatest(this.online$),
      filter(combi => combi[1]),
      map(combi => combi[0]),
      tap(v => this.loading = true),
      switchMap(v => this.find(v)),
      tap(v => this.loading = false)
    );

  }

  find(from: string): Observable<Flight[]> {
    let params = { from };
    return this.http.get<Flight[]>('http://www.angular.at/api/flight', { params });
  }

}
