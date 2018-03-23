export const IncreaseByActionType = 'INCREASE_BY';

export class IncreaseByAction {
  readonly type = IncreaseByActionType;
  constructor(readonly amount: number) {
  }
}

export type AppAction = IncreaseByAction; /*| DecreaseByAction; */

