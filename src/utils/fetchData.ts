import { FetchError } from "./fetchError";

export const fetchData = (url: string, retries: number = 0): Promise<any[]> =>
  fetch(url)
    .then(response => {
      if (!response.ok) {
        if (retries > 0) return fetchData(url, retries - 1);
        else throw new FetchError(response.status, response.statusText);
      } else {
        return response.json();
      }
    })
    .catch((error: Error) => {
      if (retries > 0) return fetchData(url, retries - 1);
      else throw new FetchError("Error: ", error.message);
    });
