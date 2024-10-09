export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
  }

  static fromResponse(response: Response) {
    return new ApiError(response.status, response.statusText);
  }
}

export class ApiClient {
  private static fullUrl(url: string) {
    const urlToAppend = url.startsWith('/') ? url : `/${url}`;
    return `${import.meta.env.VITE_BACK_END_URL}${urlToAppend}`;
  }

  private static getToken(): string | null {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }

    const parsedUser = JSON.parse(user);
    return parsedUser.token;
  }

  private static headers(get: boolean = false): Record<string, string> {
    const token = this.getToken();
    let headers: Record<string, string> = {};

    if (!get) {
      headers = {
        'Content-Type': 'application/json',
      };
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  static async get<ReturnType>(url: string): Promise<ReturnType> {
    const fullUrl = this.fullUrl(url);
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: this.headers(true),
    });

    if (!response.ok) {
      throw ApiError.fromResponse(response);
    }

    return response.json();
  }

  static async post<ReturnType>(
    url: string,
    data: Record<string, unknown> | Array<unknown>,
  ): Promise<ReturnType> {
    const fullUrl = this.fullUrl(url);
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw ApiError.fromResponse(response);
    }

    return response.json();
  }
}
