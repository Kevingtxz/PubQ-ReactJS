export default class LoadService {
  static lastLoadSecBefore(seconds: number): boolean {
    return this.getLastLoad() + seconds * 1000 < new Date().getTime();
  }

  static getLastLoad(): number {
    return JSON.parse(sessionStorage.getItem("lastLoad") || "0");
  }

  static setLastLoadNow(): void {
    sessionStorage.setItem("lastLoad", JSON.stringify(new Date().getTime()));
  }
}
