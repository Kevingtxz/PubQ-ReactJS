import TopicModel from "../model/TopicModel";
import TopicView from "../model/dto/view/TopicView";

export default class TopicService {
  static isLoadRecent(): boolean {
    const lastLoad = JSON.parse(
      localStorage.getItem("TopicListLastLoad") || "0"
    );

    if (lastLoad > new Date().getTime() / 60000 + 1) {
      return true;
    }
    return false;
  }

  static setLastLoad(): void {
    const now = new Date().getTime() / 60000;
    localStorage.setItem("TopicListLastLoad", JSON.stringify(now));
  }

  static fromLocalStorage(): TopicModel[] {
    return JSON.parse(localStorage.getItem("topicList") || "[]");
  }

  static saveOnLocalStorage(list: TopicModel[]): void {
    localStorage.setItem("topicList", JSON.stringify(list));
    this.setLastLoad();
  }

  static makeModel({ id, name }: TopicView): TopicModel {
    return { id, name };
  }

  static makeModelAll(list: TopicView[]): TopicModel[] {
    return list.map((item) => this.makeModel(item));
  }

  static verifyAutocomplete(text: string, list: string[]): string[] {
    const len = text.length;

    return list.filter((item) => {
      if (item.substring(0, len) === text) {
        return item;
      }
    });
  }
}
