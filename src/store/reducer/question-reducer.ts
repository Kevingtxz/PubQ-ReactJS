import { createSlice } from "@reduxjs/toolkit";
import QuestionModel from "../../model/QuestionModel";

export interface QuestionState {
  questionList: QuestionModel[];
}

const initialState: QuestionState = {
  questionList: [],
};

const slice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    loadQuestions(
      state: QuestionState,
      { payload }: { payload: QuestionModel[] }
    ) {
      state.questionList = payload;
    },
  },
});
const questionReducer = slice.reducer;

export const questionAction = slice.actions;
export default questionReducer;
