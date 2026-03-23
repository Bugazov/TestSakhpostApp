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
  const startedAt = Date.now();

  console.log(`[HTTP:REQ] ${method} ${url}`);

  try {
    const response = await fetch(url, init);
    const durationMs = Date.now() - startedAt;
    const json = (await response.json()) as T;

    console.log(`[HTTP:RES] ${method} ${url} ${response.status} ${durationMs}ms`);

    if (!response.ok) {
      throw buildError(response.status, url, json);
    }

    return json;
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    console.log(`[HTTP:ERR] ${method} ${url} ${durationMs}ms`, error);
    throw error;
  }
};
