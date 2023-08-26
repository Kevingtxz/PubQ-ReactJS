import StudySerieHistoryView from "./StudySerieHistoryView";

export default interface UserView {
  id: number;
  email: string;
  studySeriesHistory: StudySerieHistoryView[];
}
