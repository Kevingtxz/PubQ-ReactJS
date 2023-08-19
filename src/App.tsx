import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import useLogin from "./hook/async/use-login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Auth from "./component/Auth/Auth";

export default function App() {
  const [login] = useLogin();
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );

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
