export default interface QuestionModel {
  id: number;
  question: string;
  options: string[];
  year: number;
  subtopicId: number;
  correct: number;
  explanation: string;
  answearRight?: boolean;
}
