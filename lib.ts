export class Fetch {
  constructor(private readonly baseUrl: string) { }
  private readonly defaultConfig = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  } satisfies RequestInit;

  async get(endPoint: string) {
    const url = this.buildUrl(endPoint);
    const reponse = await fetch(url, this.defaultConfig);
    return this.handleResponse(reponse);
  }

  async post(endPoint: string, data: Record<string, any>) {
    const url = this.buildUrl(endPoint);
    const reponse = await fetch(url, {
      ...this.defaultConfig,
      method: "POST",
      body: JSON.stringify(data),
    });
    return this.handleResponse(reponse);
  }

  async patch(endPoint: string, data: Record<string, any>) {
    const url = this.buildUrl(endPoint);
    const response = await fetch(url, {
      ...this.defaultConfig,
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  private buildUrl(endpoint: string) {
    return this.baseUrl + endpoint;
  }
}
