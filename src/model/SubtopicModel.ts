export default interface SubtopicModel {
  id: number;
  name: string;
  topicId: number;
  totalAnswears: number;
  correctPercentage?: number;
}
