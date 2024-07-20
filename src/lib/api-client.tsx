export class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  static fromResponse(response: Response) {
    return new ApiError(response.status, response.statusText);
  }
}

export class ApiClient {
  private static fullUrl(url: string) {
    const urlToAppend = url.startsWith("/") ? url : `/${url}`;
    return `${import.meta.env.VITE_BACK_END_URL}${urlToAppend}`;
  }

  static async get<ReturnType>(url: string): Promise<ReturnType> {
    const fullUrl = this.fullUrl(url);
    const response = await fetch(fullUrl, {
      method: "GET",
    });

    if (!response.ok) {
      throw ApiError.fromResponse(response);
    }

    return response.json();
  }

  static async post<ReturnType>(url: string, data: any): Promise<ReturnType> {
    const fullUrl = this.fullUrl(url);
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw ApiError.fromResponse(response);
    }

    return response.json();
  }
}
