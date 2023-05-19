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
    text,
    a,
    b,
    c,
    d,
    e,
    year,
    nivel,
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
      text,
      options,
      year,
      nivel,
      subtopicId,
    };
  }

  static makeModelAll(list: QuestionView[]): QuestionModel[] {
    return list.map((item) => this.makeModel(item));
  }

  static convertNivel(nivel: number): string {
    switch (nivel) {
      case 1:
        return "Introdutório";
      case 2:
        return "Intermediário";
      case 3:
        return "Avançado";
    }
    throw new Error("Error in the convert nivel");
  }

  static findFromLocalStorageBySubtopicId(subtopicId: number): QuestionModel[] {
    const list = this.fromLocalStorage();
    return list.filter((item) => item.subtopicId === subtopicId);
  }
}
