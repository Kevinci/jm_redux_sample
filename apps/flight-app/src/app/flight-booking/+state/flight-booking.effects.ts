import {Injectable} from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FlightService } from '@flight-workspace/flight-api';
import { FlightsLoadActionType, FlightsLoadAction, FlightsLoadedAction } from './flight-booking.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class FlightBookingEffects {

    constructor(private flightService: FlightService, private actions$: Actions) {
    }

    @Effect() flightsLoad$ 
        = this
            .actions$
            .ofType(FlightsLoadActionType)
            .pipe(
                map(a => a as FlightsLoadAction),
                switchMap(a => this.flightService.find(a.from, a.to, a.urgent)),
                map(flights => new FlightsLoadedAction(flights))
            );

}
