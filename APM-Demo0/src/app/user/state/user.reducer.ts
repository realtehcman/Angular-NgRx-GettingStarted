import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

export interface UserState {
  hideUserCredentials: boolean;
}
const initialUserState: UserState = {
  hideUserCredentials: false,
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getHideUserCredentials = createSelector(
  getUserFeatureState,
  (state) => state.hideUserCredentials
);

export const userReducer = createReducer(
  initialUserState,
  on(createAction('[User] Toggle Show Credentials'), (state) => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      hideUserCredentials: !state.hideUserCredentials,
    };
  })
);
