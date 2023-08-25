import style from "./AuthPage.module.css";
import { GOOGLE_AUTH } from "../../util/constant-util";

export default function Auth() {
  const authGoogle = () => window.open(GOOGLE_AUTH, "_self");

  return (
    <div className={style["container"]}>
      <button className={style["google-btn"]} onClick={() => authGoogle()}>
        <img className={style["google-img"]} alt="Google Auth" />
        <p>Login with Google</p>
      </button>
    </div>
  );
}
