import { API_URL } from "./constant-util";

const urlUtil = {
  QUESTIONS_BY_SUBTOPIC: (subtopicId: number, page: number) =>
    API_URL + `api/v1/questions/subtopic/${subtopicId}/page=${page}`,
};

export default urlUtil;
