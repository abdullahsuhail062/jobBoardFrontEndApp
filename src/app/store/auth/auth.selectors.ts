import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(selectAuthState, state => state.token);
export const selectUserRole = createSelector(selectAuthState, state => state.role);
export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectUserId = createSelector(selectAuthState, state => state.user?.id)
export const selectUsernmae = createSelector(selectAuthState, state => state.user?.username);
export const selectIsLoggedIn = createSelector(selectAuthState, state => !!state.token);
export const selectAuthError = createSelector(selectAuthState, (state) => state.error);
export const selectAuthLoading = createSelector(selectAuthState, (state) => state.loading)
