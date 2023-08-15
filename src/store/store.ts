import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./reducer/topic-reducer";
import questionReducer from "./reducer/question-reducer";
import subtopicReducer from "./reducer/subtopic-reducer";
import authReducer from "./reducer/auth-reducer";

const store = configureStore({
  reducer: { topicReducer, questionReducer, subtopicReducer, authReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
