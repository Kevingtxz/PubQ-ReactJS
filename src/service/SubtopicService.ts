import SubtopicView from "../model/dto/view/SubtopicView";
import SubtopicModel from "../model/SubtopicModel";

export default class SubtopicService {
  static fromLocalStorage(): SubtopicModel[] {
    return JSON.parse(localStorage.getItem("subtopicList") || "[]");
  }

  static addOnLocalStorage(list: SubtopicModel[]): void {
    const listOld = this.fromLocalStorage();
    listOld.push(...list);
    localStorage.setItem("subtopicList", JSON.stringify(listOld));
  }

  static makeModel({ id, name, topicId }: SubtopicView): SubtopicModel {
    return { id, name, topicId, totalAnswears: 0 };
  }

  static makeModelAll(list: SubtopicView[]): SubtopicModel[] {
    return list.map((item) => this.makeModel(item));
  }

  static findFromLocalStorageBySubtopicId(topicId: number): SubtopicModel[] {
    const list = this.fromLocalStorage();
    return list.filter((item) => item.topicId === topicId);
  }
}
