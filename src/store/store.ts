import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./reducer/topic-reducer";
import questionReducer from "./reducer/question-reducer";
import subtopicReducer from "./reducer/subtopic-reducer";

const store = configureStore({
  reducer: { topicReducer, questionReducer, subtopicReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
