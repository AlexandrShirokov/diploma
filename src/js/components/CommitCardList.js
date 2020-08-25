export class CommitCardList {
    constructor(container, createCardCallback) {
      this.container = container;
      this.createCardCallback = createCardCallback;
    }
  
    addCard(item) {
      const card = this.createCardCallback(item)
      this.container.append(card);
    }
  
    render(arr) {
      arr.forEach((item) => {
        this.addCard(item)
      });
    }
  }