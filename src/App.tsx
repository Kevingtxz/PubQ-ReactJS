import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import Auth from "./component/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import useLogin from "./hook/async/use-login";

export default function App() {
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const [login] = useLogin();

  useEffect(() => {
    login();
  }, [login]);

  if (!isLogged) {
    return <Auth />;
  } else {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    );
  }
}
function dispatch(arg0: {
  payload: import("./model/dto/view/UserView").default;
  type: "auth/login";
}) {
  throw new Error("Function not implemented.");
}
