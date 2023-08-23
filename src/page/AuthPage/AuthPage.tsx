import styles from "./AuthPage.module.css";
import { GOOGLE_AUTH } from "../../util/constant-util";

export default function Auth() {
  const authGoogle = () => window.open(GOOGLE_AUTH, "_self");

  return (
    <div className={styles["container"]}>
      <button onClick={() => authGoogle()} className={styles["google-btn"]}>
        <img className={styles["google-img"]} alt="Google Auth" />
      </button>
    </div>
  );
}
