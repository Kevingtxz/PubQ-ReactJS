import style from "./ErrorHandler.module.css";

export default function ErrorHandler() {
  return (
    <div className={style["main-div"]}>
      <h1 className={style["h1"]}>Error occurred, please go to another page</h1>
    </div>
  );
}
