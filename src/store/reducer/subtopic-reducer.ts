import { createSlice } from "@reduxjs/toolkit";
import SubtopicModel from "../../model/SubtopicModel";

export interface SubtopicState {
  subtopicSelected?: SubtopicModel;
  subtopicList: SubtopicModel[];
}

const initialState: SubtopicState = {
  subtopicList: [],
};

const slice = createSlice({
  name: "subtopic",
  initialState: initialState,
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
    addAnswearsStatisticsToSelectedSubtopic(
      state: SubtopicState,
      {
        payload,
      }: {
        payload: {
          id: number;
          totalAnswears: number;
          correctPercentage: number;
        };
      }
    ) {},
  },
});
const subtopicReducer = slice.reducer;

export const subtopicAction = slice.actions;
export default subtopicReducer;
