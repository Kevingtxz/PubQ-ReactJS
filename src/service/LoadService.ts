export default class LoadService {
  static fromLocalStorage(): number {
    return JSON.parse(localStorage.getItem("lastLoad") || "0");
  }

  static addOnLocalStorage(): void {
    localStorage.setItem("lastLoad", JSON.stringify(new Date().getTime()));
  }
}
