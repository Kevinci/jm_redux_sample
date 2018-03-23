import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Flight } from '@flight-workspace/flight-api';

@Injectable()
export class EventService {

    private flightSelectedSubject = new ReplaySubject<Flight>(3);
    public flightSelected$ = this.flightSelectedSubject.asObservable();

    public flightSelected(f: Flight): void {
        if (!f) throw Error('Flight must not be null!');
        this.flightSelectedSubject.next(f);
    }

}