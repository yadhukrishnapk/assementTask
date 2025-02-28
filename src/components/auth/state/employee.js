import { atom } from "recoil";

export const employeeState = atom({
  key: "employeeState",
  default: {
    data: [],
    loading: false,
    error: null,
  },
});
