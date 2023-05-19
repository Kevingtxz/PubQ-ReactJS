export default interface QuestionModel {
  id: number;
  text: string;
  options: string[];
  year: number;
  nivel: number;
  subtopicId: number;
  correct?: number;
  explanation?: string;
}
