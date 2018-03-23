import {App} from './app.interfaces';
import { AppAction, IncreaseByAction } from './app.actions';

export function appReducer(state: App, action: AppAction): App {
  switch (action.type) {
    case 'INCREASE_BY': {

      // Mutable (nicht erwünscht!)
      // state.counter = state.counter + action.amount;

      // Immutable
      return { counter: state.counter + action.amount }
    }
    default: {
      return state;
    }
  }
}
