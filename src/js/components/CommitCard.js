export class CommitCard {
    constructor(item, template) {
      this.item = item;
      this.template = template;
      this.card = null;
    }

    create() {
        this.card = this.template.cloneNode(true);
        this.card.querySelector('.commits__paragraph').textContent = this.item.commit.committer.email;;
        this.card.querySelector('.commits__header').textContent = this.item.commit.committer.name;
        this.card.querySelector('.commits__text').textContent = this.item.commit.message;
        const date = new Date(this.item.commit.committer.date).toLocaleString('ru', {
          day: 'numeric',
          month: 'long'
        });
        const otherDate = new Date(this.item.commit.committer.date);
        let year = otherDate.getFullYear();
        this.card.querySelector('.commits__date').textContent = date + ', ' + `${year}`;
        this.card.querySelector('.commits__avatar').setAttribute('src', `${this.item.author.avatar_url}`);
        this.card.setAttribute('href', `${this.item.url}`);
        return this.card
      }
}
