import { createSlice } from "@reduxjs/toolkit";
import UserView from "../../model/dto/view/UserView";
import StudySerieHistoryView from "../../model/dto/view/StudySerieHistoryView";

export interface AuthState {
  isLogged: boolean;
  user?: UserView;
}

const initialState: AuthState = {
  isLogged: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state: AuthState, { payload }: { payload: UserView }) {
      state.isLogged = true;
      state.user = payload;
    },
    logout(state: AuthState) {
      state.isLogged = false;
      state.user = undefined;
    },
    addHistory(
      state: AuthState,
      { payload }: { payload: StudySerieHistoryView }
    ) {
      state.user?.studySeriesHistory.push(payload);
    },
  },
});
const authReducer = slice.reducer;

export const authAction = slice.actions;
export default authReducer;
