export class NewsCard {
    constructor(item, template) {
      this.item = item;
      this.template = template;
      this.card = null;
    }

    create() {
        this.card = this.template.cloneNode(true);
        this.card.querySelector('.results__source').textContent = this.item.source.name;
        this.card.querySelector('.results__card-header').textContent = this.item.title;
        this.card.querySelector('.results__paragraph').textContent = this.item.description;
        const date = new Date(this.item.publishedAt)
        const dayMonth = date.toLocaleString('ru', {
          day: 'numeric',
          month: 'long'
        });;
        const year = date.getFullYear();
        this.card.querySelector('.results__date').textContent = dayMonth + ', ' + `${year}`;
        this.card.querySelector('.results__image').setAttribute('src', `${this.item.urlToImage}`);
        this.card.setAttribute('href', `${this.item.url}`);
        return this.card
      }
}

//getday

// const date = new Date(this.item.publishedAt).toLocaleString('ru', {
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric'
// });