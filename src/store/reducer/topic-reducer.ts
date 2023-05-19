import { createSlice } from "@reduxjs/toolkit";
import TopicModel from "../../model/TopicModel";

export interface TopicState {
  topicSelected?: TopicModel;
  topicList: TopicModel[];
}

const initialTopicsState: TopicState = {
  topicList: [],
};

const topicSlice = createSlice({
  name: "topic",
  initialState: initialTopicsState,
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
const topicReducer = topicSlice.reducer;

export const topicAction = topicSlice.actions;
export default topicReducer;
