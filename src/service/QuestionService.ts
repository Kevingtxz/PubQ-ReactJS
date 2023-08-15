import QuestionModel from "../model/QuestionModel";
import QuestionView from "../model/dto/view/QuestionView";

export default class QuestionService {
  static fromLocalStorage(): QuestionModel[] {
    return JSON.parse(localStorage.getItem("questionList") || "[]");
  }

  static addOnLocalStorage(list: QuestionModel[]): void {
    const listOld = this.fromLocalStorage();
    listOld.push(...list);
    localStorage.setItem("questionList", JSON.stringify(listOld));
  }

  static makeModel({
    id,
    question,
    a,
    b,
    c,
    d,
    e,
    correct,
    explanation,
    year,
    subtopicId,
  }: QuestionView): QuestionModel {
    const options: string[] = [];
    options.push(a);
    options.push(b);
    options.push(c);
    options.push(d);
    options.push(e);

    return {
      id,
      question,
      options,
      correct,
      explanation,
      year,
      subtopicId,
    };
  }

  static makeModelAll(list: QuestionView[]): QuestionModel[] {
    console.log(list);
    return list.map((item) => this.makeModel(item));
  }

  static findFromLocalStorageBySubtopicId(subtopicId: number): QuestionModel[] {
    const list = this.fromLocalStorage();
    return list.filter((item) => item.subtopicId === subtopicId);
  }
}
