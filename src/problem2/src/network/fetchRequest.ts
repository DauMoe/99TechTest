export const customFetch = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  let requestUrl = url;
  let data;

  if (options.params) {
    const query = new URLSearchParams(options.params as Record<string, string>).toString();
    requestUrl += (requestUrl.includes('?') ? '&' : '?') + query;
  }

  const fetchOptions: RequestInit = {
    method: options.method || 'GET',
    headers: options.headers || {},
  };

  if (options.payload && fetchOptions.method !== 'GET') {
    fetchOptions.body = JSON.stringify(options.payload);
    fetchOptions.headers = {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
    };
  }

  const response = await fetch(requestUrl, fetchOptions);
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw { status: response.status, error: data };
  }

  return data as T;
}