export default class ApiClient {
  private apiHost: string;

  constructor(apiHost: string) {
    this.apiHost = apiHost;
  }

  private createReqUrl(enpoint: string) {
    return `${this.apiHost}${enpoint}`;
  }

  protected async get(enpoint: string) {
    const url = this.createReqUrl(enpoint);

    const res = await fetch(url, {
      method: "get",
    });

    if (!res.ok) {
      throw new Error("[ERROR]: Что-то пошло не так");
    }

    return await res.json();
  }
}
