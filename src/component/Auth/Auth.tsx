import style from "./Auth.module.css";
import envConfig from "../../config/envConfig";

export default function Auth() {
  const auth = () =>
    window.open(`${envConfig.API_URL}api/v1/auth/google/callback`, "_self");

  return (
    <div className={style["container"]}>
      <button className={style["googleBtn"]} onClick={auth}>
        Auth Google
      </button>
    </div>
  );
}
