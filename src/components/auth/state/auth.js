import { atom, selector } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    token: localStorage.getItem("authToken") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: Boolean(localStorage.getItem("authToken")),
  },
});

export const isAuthenticatedSelector = selector({
  key: "isAuthenticatedSelector",
  get: ({ get }) => get(authState).isAuthenticated,
});
