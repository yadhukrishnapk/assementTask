// store/authStore.js
import { atom } from 'jotai';

export const tokenAtom = atom(null);
export const userAtom = atom(null);
export const isAuthenticatedAtom = atom(false);

// Atom with write capabilities for auth state
export const authAtom = atom(
  (get) => ({
    token: get(tokenAtom),
    user: get(userAtom),
    isAuthenticated: get(isAuthenticatedAtom),
  }),
  (get, set, update) => {
    if ('token' in update && 'user' in update) {
      // Set auth
      set(tokenAtom, update.token);
      set(userAtom, update.user);
      set(isAuthenticatedAtom, true);
    } else {
      // Clear auth
      set(tokenAtom, null);
      set(userAtom, null);
      set(isAuthenticatedAtom, false);
    }
  }
);