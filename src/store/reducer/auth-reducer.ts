import { createSlice } from "@reduxjs/toolkit";
import UserModel from "../../model/dto/view/UserView";

export interface AuthState {
  isLogged: boolean;
  user?: UserModel;
}

const initialState: AuthState = {
  isLogged: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state: AuthState, { payload }: { payload: UserModel }) {
      state.isLogged = true;
      state.user = payload;
    },
    logout(state: AuthState) {
      state.isLogged = false;
      state.user = undefined;
    },
  },
});
const authReducer = slice.reducer;

export const authAction = slice.actions;
export default authReducer;
