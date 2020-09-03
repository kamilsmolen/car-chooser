import { FetchError } from "./fetchError";

export const fetchData = (url: string, retries: number = 5): any =>
  fetch(url)
    .then((response: any) => {
      const responseBody = response.json();

      if (!response.ok) {
        if (retries > 0) return fetchData(url, retries - 1);
        else throw new FetchError(response.status, response.statusText);
      } else return responseBody;
    })
    .catch(() => {
      if (retries > 0) return fetchData(url, retries - 1);
      //else throw new FetchError(response.status, response.statusText);
    });
