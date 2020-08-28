import { FetchError } from './fetchError';

const processResponse = (response: any) => {
  const responseBody = response.json();

  if (!response.ok) {
    throw new FetchError(response.status, response.statusText);
  }

  return responseBody;
};

export const fetchData = (url: string) => fetch(url).then(processResponse);
