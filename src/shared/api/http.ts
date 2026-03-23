type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD';

const getMethod = (init?: RequestInit): HttpMethod => {
  return ((init?.method?.toUpperCase() as HttpMethod) ?? 'GET');
};

const buildError = (status: number, url: string, body: unknown) => {
  const error = new Error(`HTTP ${status} for ${url}`);
  return Object.assign(error, { status, body });
};

export const http = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const method = getMethod(init);

  try {
    const response = await fetch(url, init);
    const json = (await response.json()) as T;

    if (!response.ok) {
      throw buildError(response.status, url, json);
    }

    return json;
  } catch (error) {
    throw error;
  }
};
