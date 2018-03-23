import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.interfaces';
import { Observable } from 'rxjs/Observable';
import { IncreaseByAction } from '../+state/app.actions';
import { getAppState } from 'apps/flight-app/src/app/+state/app.selectors';
import { getCounter } from '../+state/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute) {
  }

  needsLogin: boolean;
  _userName: string = '';

  counter$: Observable<number>; // BahaviorSubject

  ngOnInit() {
    this.counter$ = this.store.select(getCounter);
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  countUp(): void {
    this.store.dispatch(new IncreaseByAction(1));
  }

  get userName(): string {
    return this._userName;
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!'
  }

  logout(): void {
    this._userName = '';
  }


}
