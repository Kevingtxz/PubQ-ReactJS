import QuestionAnswearModel from "./QuestionAnswearView";

export default interface TopicModel {
  id: number;
  email: string;
  created_at: string;
  questionAnswears: QuestionAnswearModel[];
}
