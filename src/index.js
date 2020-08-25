import './pages/index.css';
import {NewsApi} from './js/modules/NewsApi.js';
import {NewsCard} from './js/components/NewsCard.js';
import {NewsCardList} from './js/components/NewsCardList.js';

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
  
  function createCardCallback(item) {
    const newsCard = new NewsCard(item, template);
    return newsCard.create()
  }
  const newsCardList = new NewsCardList(resultsNewsCards, createCardCallback);

  function getDateFromStorage() {
    resultsNewsCards.textContent = '';
    const arrCards = localStorage.getItem('cards');
    const storageNews = JSON.parse(arrCards);
    const storageKey = localStorage.getItem('input');  
    const allCards = arrCards ? JSON.parse(arrCards).articles : [];
    notFound.setAttribute('style', 'display :none');
    preloader.setAttribute('style', 'display :none');
    if (storageNews != null) {
      formInput.value = storageKey;
      const splicedCards = allCards.splice(0, 3);
      let renderedCards = 0;
      function renderCallBack() {
        if (renderedCards === allCards.length) {
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
    } 
  }  

 getDateFromStorage()
  

  const date = new Date(); //Расчёт даты
  let fromDay = date.getDate();
  let fromMonth = date.getMonth()+1;
  let fromYear = date.getFullYear();
  const last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
  let day = last.getDate();
  let month = last.getMonth()+1;
  let year = last.getFullYear();

  searchForm.addEventListener('submit', (event) => { //Форма поиска
    event.preventDefault();
    localStorage.clear();
    notFound.setAttribute('style', 'display :none');
    results.setAttribute('style', 'display :none');
    preloader.setAttribute('style', 'display :block');
    resultsNewsCards.textContent = '';
    const analyticsTopic = formInput.value;
    const topic = formInput.value.toLowerCase();
    localStorage.setItem('input', analyticsTopic);
    const options = {
      url: `${serverUrl}/v2/everything?q=${topic}&apiKey=3f3d36af8e6c4ab2bf5aabf4601b5dac&from=${fromYear}-${fromMonth}-${fromDay}&to=${year}-${month}-${day}&pageSize=100`,
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

    newsApi.getNews().then(res => { 
      localStorage.setItem('cards', JSON.stringify(res));
      const raw = localStorage.getItem('cards');
      const parse = JSON.parse(raw);
      const articles = parse.articles;
      const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      localStorage.setItem('articles', JSON.stringify(storedArticles.concat(articles)));
      const filterTitle = articles.filter(item => item.title.toLowerCase().includes(topic));
      const filterDescription = articles.filter(item => item.description && item.description.toLowerCase().includes(topic));
      const filterLength = filterTitle.length + filterDescription.length;
      localStorage.setItem('filter', filterLength);

      showMore.setAttribute('style', 'display :block');
      preloader.setAttribute('style', 'display :none');
      if (articles.length <= 3) {
        showMore.setAttribute('style', 'display :none');
      }
      if (articles.length === 0 ) {
        notFound.setAttribute('style', 'display :flex');
      } else { 
        const allCards = articles;
        const splicedCards = allCards.splice(0, 3);
        let renderedCards = 0;
        function renderCallBack() {
          if (renderedCards === articles.length) {
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
