import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.models';

export const initialState: AuthState = {
  token: null,
  role: null,
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { token, role, user }) => ({
    ...state,
    token,
    role,
    user,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    token: null,
    role: null,
    user: null,
  })),

  on(AuthActions.logout, (state) => ({
    ...initialState
  }))
);
