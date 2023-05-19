import { createSlice } from "@reduxjs/toolkit";
import SubtopicModel from "../../model/SubtopicModel";

export interface SubtopicState {
  subtopicSelected?: SubtopicModel;
  subtopicList: SubtopicModel[];
}

const initialSubtopicsState: SubtopicState = {
  subtopicList: [],
};

const subtopicSlice = createSlice({
  name: "subtopic",
  initialState: initialSubtopicsState,
  reducers: {
    loadSubtopics(
      state: SubtopicState,
      { payload }: { payload: SubtopicModel[] }
    ) {
      state.subtopicList = payload;
    },
    selectSubtopic(
      state: SubtopicState,
      { payload }: { payload: SubtopicModel }
    ) {
      state.subtopicSelected = payload;
    },
  },
});
const subtopicReducer = subtopicSlice.reducer;

export const subtopicAction = subtopicSlice.actions;
export default subtopicReducer;
