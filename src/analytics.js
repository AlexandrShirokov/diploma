import './pages/index.css';

(function () {
    const requestHeader = document.querySelector('.request__header-span'); 
    const spanResults = document.querySelector('.request__span-results');
    const spanTitle = document.querySelector('.request__span-title');
    const spanMonth = document.querySelector('.spanMonth');
    const raw = localStorage.getItem('cards');
    const parse = JSON.parse(raw);
    const articles = parse.articles;
    const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const isInCurrentWeek = date => true; 
    const articlesByWeek = articles.reduce(
        (acc, articles) => {
        const date = new Date(articles.publishedAt);
        const cba = date.getDay()
        if (!isInCurrentWeek(date)) return acc;
          const key = `${date.getDate()}, ${weekDays[date.getDay()]}`;
          return {
                ...acc,
          [key]: (acc[key] || []).concat(articles)
        }
      },
      {}
    );
    
    const newArr = Object.entries(articlesByWeek);
    const arrSort = newArr.sort();
    arrSort.forEach(
      (item, index) => {
        const day = item[0];
        const articles = item[1]
        const dayEl = document.querySelector(`.diagram__date-${index + 1}`);
        dayEl.textContent = day;
        const barEl = document.querySelector(`.diagram__span-${index + 1}`);
        barEl.textContent = articles.length;
        const divEl = document.querySelector(`.diagram__div-${index + 1}`)
        divEl.setAttribute('style', `width: ${articles.length}%`);
       }
     )
 
    const date = new Date();
        const dayMonth = date.toLocaleString('ru', {
          month: 'long'
        });;
    requestHeader.textContent = localStorage.getItem('input');
    spanTitle.textContent = localStorage.getItem('filter');
    spanResults.textContent = parse.totalResults;
    spanMonth.textContent = dayMonth;

})();

