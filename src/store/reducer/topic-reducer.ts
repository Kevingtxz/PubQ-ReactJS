import { createSlice } from "@reduxjs/toolkit";
import TopicModel from "../../model/TopicModel";

export interface TopicState {
  topicSelected?: TopicModel;
  topicList: TopicModel[];
}

const initialState: TopicState = {
  topicList: [],
};

const slice = createSlice({
  name: "topic",
  initialState: initialState,
  reducers: {
    loadTopics(state: TopicState, { payload }: { payload: TopicModel[] }) {
      state.topicList = payload;
    },
    selectTopic(state: TopicState, { payload }: { payload: TopicModel }) {
      if (!state.topicList.find((item) => item.id === payload.id)) {
        state.topicList.push(payload);
      }
      state.topicSelected = payload;
    },
  },
});
const topicReducer = slice.reducer;

export const topicAction = slice.actions;
export default topicReducer;
