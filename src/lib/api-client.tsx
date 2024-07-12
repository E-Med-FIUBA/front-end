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
      throw new Error(response.statusText);
    }

    return response.json();
  }
}
