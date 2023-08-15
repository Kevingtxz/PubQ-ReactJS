import envConfig from "../config/envConfig";

const urlUtil = {
  RANDOM_QUESTIONS_BY_SUBTOPIC: (subtopicId: number) =>
    envConfig.API_URL + `api/v1/questions/random/subtopic=${subtopicId}`,
};

export default urlUtil;
