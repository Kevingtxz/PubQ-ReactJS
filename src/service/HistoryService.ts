import SubtopicModel from "../model/SubtopicModel";
import StudySerieHistoryForm from "../model/dto/form/StudySerieHistoryForm";

export default class HistoryService {
  static makeForm({
    totalQuestions,
    totalCorrect,
    subtopic,
  }: {
    totalQuestions: number;
    totalCorrect: number;
    subtopic: SubtopicModel;
  }): StudySerieHistoryForm {
    if (subtopic.selectedTime === undefined) {
      throw new Error("Subtopic selected time not defined");
    }
    return {
      totalQuestions,
      totalCorrect,
      time: Math.floor((new Date().getTime() - subtopic.selectedTime) / 1000),
      subtopicId: subtopic.id,
    };
  }
}
