export class GitHubApi {
    constructor(options) {
       this.options = options;
       this.url = options.url;
       this.headers = options.headers;
    }
    getCommits() {
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