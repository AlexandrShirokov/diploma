export class DataStorage {
    constructor(options) {
       this.options = options;
       this.url = options.url;
       this.headers = options.headers;
    }
    createDataStorage(result, request) {
        // return fetch(this.url, {
        //     headers: this.headers
        //   })
        // .then(res => {
        //     if (res.ok) {
        //       return res.json();
        //     } return Promise.reject(res.status)
        //   })
        // 2 раза должен вызываться setItem
        // В резалт передаётся массив карточек, в реквэст передаётся keyword
        // Добавить ещё 2 метода, один будет забирать news, другой keywords 
    }


}