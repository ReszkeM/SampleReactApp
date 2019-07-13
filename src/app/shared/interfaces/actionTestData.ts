export interface ActionTestData<Action, ExpectedType> {
  action: Action;
  expectedType: ExpectedType;
  expectedPayload?: object;
}

export type ActionsTestData<Action, ExpectedType> = Array<ActionTestData<Action, ExpectedType>>;
