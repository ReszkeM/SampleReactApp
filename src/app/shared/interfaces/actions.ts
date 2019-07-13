import { Action } from 'redux';

export interface ActionWithPayload<ActionType, PayloadType> extends Action<ActionType> {
  payload: PayloadType;
}
