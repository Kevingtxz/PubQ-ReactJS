import { createBrowserRouter } from "react-router-dom";
import ErrorHandler from "./component/ErrorHandler/ErrorHandler";
import TopicPage from "./page/TopicPage/TopicPage";
import QuestionPage from "./page/QuestionPage/QuestionPage";
import LoginPage from "./page/LoginPage/LoginPage";
import AuthPage from "./page/AuthPage/AuthPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TopicPage />,
    errorElement: <ErrorHandler />,
  },
  {
    path: "/questions",
    element: <QuestionPage />,
    errorElement: <ErrorHandler />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorHandler />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <ErrorHandler />,
  },
]);

export { router };
