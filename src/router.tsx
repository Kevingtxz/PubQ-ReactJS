import { createBrowserRouter } from "react-router-dom";
import ErrorHandler from "./component/ErrorHandler/ErrorHandler";
import TopicPage from "./page/TopicPage/TopicPage";
import AuthPage from "./page/AuthPage/AuthPage";
import LoginPage from "./page/LoginPage/LoginPage";
import QuestionPage from "./page/QuestionPage/QuestionPage";

const topicPageConfig = {
  path: "/",
  element: <TopicPage />,
  errorElement: <ErrorHandler />,
};

const questionPageConfig = {
  path: "/questions",
  element: <QuestionPage />,
  errorElement: <ErrorHandler />,
};

const authPageConfig = {
  path: "/auth",
  element: <AuthPage />,
  errorElement: <ErrorHandler />,
};

const loginPageConfig = {
  path: "/login",
  element: <LoginPage />,
  errorElement: <ErrorHandler />,
};

const router = createBrowserRouter([
  topicPageConfig,
  questionPageConfig,
  authPageConfig,
  loginPageConfig,
]);

export { router };
