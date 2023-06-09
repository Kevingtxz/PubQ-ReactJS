import { API_URL } from "../../util/constant-util";
import { useCallback, useState } from "react";

export enum MethodsEnum {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
  PATCH = "PATCH",
}

export enum UrlEnum {
  TOPICS = "api/v1/topics",
  SUBTOPICS_BY_TOPIC = "api/v1/subtopics/topic=",
  QUESTIONS_BY_SUBTOPIC = "api/v1/questions/subtopic/",
}

export type sendRequestProps = {
  url?: string;
  method?: MethodsEnum;
  body?: unknown | unknown[];
  dataHandler?: (data: any) => void;
};

export type useHttpReturn = [
  isLoading: boolean,
  error: unknown,
  sendRequest: ({ url, method, body, dataHandler }: sendRequestProps) => void
];

export default function useHttp(): useHttpReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ url, method, body, dataHandler }: sendRequestProps) => {
      let headers: HeadersInit = {};

      if (method === "POST" || method === "PUT") {
        headers = { "Content-Type": "application/json" };
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch((url = API_URL + url), {
          method: method ? method : MethodsEnum.GET,
          headers: headers,
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error("Request faild");
        }

        const data = await response.json();
        if (dataHandler) {
          dataHandler(data);
        }
      } catch (err: unknown) {
        console.log(err);
      }
      setIsLoading(false);
    },
    []
  );

  return [isLoading, error, sendRequest] as useHttpReturn;
}
