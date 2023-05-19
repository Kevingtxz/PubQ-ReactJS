import { createSlice } from "@reduxjs/toolkit";
import QuestionModel from "../../model/QuestionModel";

export interface QuestionState {
  questionList: QuestionModel[];
}

const initialQuestionsState: QuestionState = {
  questionList: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState: initialQuestionsState,
  reducers: {
    loadQuestions(
      state: QuestionState,
      { payload }: { payload: QuestionModel[] }
    ) {
      state.questionList = payload;
    },
  },
});
const questionReducer = questionSlice.reducer;

export const questionAction = questionSlice.actions;
export default questionReducer;
