import {Component, OnInit, OnDestroy} from '@angular/core';
import { EventService } from '../event.service';
import { Flight } from '@flight-workspace/flight-api';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {


  constructor(private eventService: EventService) {
  }



  private closeSubject = new Subject<void>();

  flights: Flight[] = [];

  ngOnInit(): void {
    this.eventService
        .flightSelected$
        .pipe(takeUntil(this.closeSubject))
        .subscribe(f => {
          if (!f) return;
          this.flights.push(f);

          if (this.flights.length > 3) {
            this.flights.shift();
          }
        })
  }

  ngOnDestroy(): void {
    this.closeSubject.next();
  }

}
