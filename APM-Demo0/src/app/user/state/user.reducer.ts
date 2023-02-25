import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { toggleShowCredentials } from './user.actions';

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
  on(toggleShowCredentials, (state) => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      hideUserCredentials: !state.hideUserCredentials,
    };
  })
);
export { toggleShowCredentials };

