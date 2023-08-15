import { API_URL } from "./constant-util";

const urlUtil = {
  RANDOM_QUESTIONS_BY_SUBTOPIC: (subtopicId: number) =>
    API_URL + `api/v1/questions/random/subtopic=${subtopicId}`,
};

export default urlUtil;
