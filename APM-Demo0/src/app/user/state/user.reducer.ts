import { createAction, createReducer, on } from '@ngrx/store';

export const userReducer = createReducer(
  {
    hideUserCredentials: true,
  },
  on(createAction('[User] Toggle Show Credentials'), (state) => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      hideUserCredentials: !state.hideUserCredentials,
    };
  })
);
