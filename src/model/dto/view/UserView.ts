import QuestionAnswearView from "./QuestionAnswearView";

export default interface UserView {
  id: number;
  email: string;
  created_at: string;
  questionAnswears: QuestionAnswearView[];
}
