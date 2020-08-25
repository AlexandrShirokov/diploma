export class NewsApi {
    constructor(options) {
       this.options = options;
       this.url = options.url;
       this.headers = options.headers;
    }
    getNews() {
        return fetch(this.url, {
            headers: this.headers
          })
        .then(res => {
            if (res.ok) {
              return res.json();
            } return Promise.reject(res.status)
          })
    }
}