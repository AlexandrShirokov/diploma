import './pages/index.css';
import {NewsApi} from './js/modules/NewsApi.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsCardList} from './js/components/NewsCardList.js';
//import {DataStorage} from './js/modules/DataStorage.js';

(function () {
  const resultsNewsCards = document.querySelector('.results__news-cards');
  const template = document.querySelector('.template').content.querySelector('.results__card');
  const preloader = document.querySelector('.preloader');
  const results = document.querySelector('.results');
  const notFound = document.querySelector('.not-found');
  const error = document.querySelector('.error');
  const formInput = document.querySelector('.search__input_type_search');
  const showMore = document.querySelector('.results__button');
  const searchForm = document.querySelector('.search__form');
  const serverUrl = NODE_ENV === 'development' ? 'https://nomoreparties.co/news' : 'https://newsapi.org';

  searchForm.addEventListener('submit', (event) => { //Форма поиска
    event.preventDefault();
    notFound.setAttribute('style', 'display :none');
    results.setAttribute('style', 'display :none');
    preloader.setAttribute('style', 'display :block');
    resultsNewsCards.textContent = '';
    const topic = formInput.value;
    const options = {
      url: `${serverUrl}/v2/everything?q=${topic}&apiKey=3f3d36af8e6c4ab2bf5aabf4601b5dac&from=2020-08-09&to=2020-08-16&pageSize=100`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const newsApi =  new NewsApi(options);
    function createCardCallback(item) {
      const newsCard = new NewsCard(item, template);
      return newsCard.create()
    }
    const newsCardList = new NewsCardList(resultsNewsCards, createCardCallback);
    //const dataStorage = new DataStorage();

    newsApi.getNews().then(res => { 
      localStorage.setItem('cards', JSON.stringify(res));
      const raw = localStorage.getItem('cards');
      const parse = JSON.parse(raw);
      showMore.setAttribute('style', 'display :block');
      preloader.setAttribute('style', 'display :none');
      if (parse.articles.length <= 3) {
        showMore.setAttribute('style', 'display :none');
      }
      if (parse.articles.length === 0 ) {
        notFound.setAttribute('style', 'display :flex');
      } else { 
        const allCards = parse.articles;
        const splicedCards = allCards.splice(0, 3);
        let renderedCards = 0;
        function renderCallBack() {
          if (renderedCards === parse.articles.length) {
            showMore.setAttribute('style', 'display :none');
          } else {
            showMore.setAttribute('style', 'display :block');
          }
        }   
        results.setAttribute('style', 'display :flex');
        newsCardList.render(splicedCards);   
        showMore.addEventListener('click', () => { //Кнопка показать ещё
          let renderedCards = 0;
          const nextCards = allCards.splice(renderedCards, 3);
          renderedCards += 3; 
          renderCallBack();     
          newsCardList.render(nextCards);
        })
      };
    }).catch(err => {
      preloader.setAttribute('style', 'display :none');
      error.setAttribute('style', 'display :flex');
      console.log(err);
      });
  })
  
})();
