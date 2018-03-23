export interface App {
  readonly counter: number;
}

// Wrapper for state; ignore for now
export interface AppState {
  readonly app: App;
}
