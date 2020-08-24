import './pages/index.css';
//import {Statistics} from './js/components/Statistics.js'

(function () {
    const requestHeader = document.querySelector('.request__header-span'); 
    const spanResults = document.querySelector('.request__span-results');
    const spanTitle = document.querySelector('.request__span-title');
    const spanMonth = document.querySelector('.spanMonth');
    //const spanDay = document.querySelector('.span-day')
    const raw = localStorage.getItem('cards');
    const parse = JSON.parse(raw);
    const articles = parse.articles;
    const firstDay = document.querySelector('.diagram__date-1');
    const secondDay = document.querySelector('.diagram__date-2');
    const thirdDay = document.querySelector('.diagram__date-3');
    const fourthDay = document.querySelector('.diagram__date-4');
    const fifthDay = document.querySelector('.diagram__date-5');
    const sixthDay = document.querySelector('.diagram__date-6');
    const seventhDay = document.querySelector('.diagram__date-7');
    const firstSpanNumber = document.querySelector('.diagram__span-1');
    const secondSpanNumber = document.querySelector('.diagram__span-2');
    const thirdSpanNumber = document.querySelector('.diagram__span-3');
    const fourthSpanNumber = document.querySelector('.diagram__span-4');
    const fifthSpanNumber = document.querySelector('.diagram__span-5');
    const sixthSpanNumber = document.querySelector('.diagram__span-6');
    const seventhSpanNumber = document.querySelector('.diagram__span-7');
    
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
    
    // date = new Date()
    // const newDay = date.getDay();
    // console.log(newDay)
    //articlesByWeek.sort()
    // for (const [newKeys, newValues] of Object.entries(articlesByWeek)) {
    // }
    
    const newArr = Object.entries(articlesByWeek);
    const arrSort = newArr.sort()

    // function renderAnalyticsRow() {
    //   const date = [];
    //   const articles = [];
    // }
    //console.log(newKeys)
    // console.log(newArr)
    // const rednerArr = newArr.forEach(
    //   ([date, articles]) => {
    //     renderAnalyticsRow(date, articles)
    //   }
    // );


    //console.log(rednerArr)
    // newArr.sort((a, b) => {
    //     return a.name - b.name
    // })
    // newArr.forEach(
    //     ([date, articles]) => {
    //       renderAnalyticsRow(date, articles)
    //     }
    //   );
    const newKeys = Object.keys(arrSort)
    firstDay.textContent = newKeys[0];
    secondDay.textContent = newKeys[1];
    thirdDay.textContent = newKeys[2];
    fourthDay.textContent = newKeys[3];
    fifthDay.textContent = newKeys[4];
    sixthDay.textContent = newKeys[5];
    seventhDay.textContent = newKeys[6];

    const newValues = Object.values(arrSort);
    console.log(newArr)
    console.log(newKeys)
    console.log(newValues)
    firstSpanNumber.textContent = newValues[0].length;
    secondSpanNumber.textContent = newValues[1].length;
    thirdSpanNumber.textContent = newValues[2].length;
    fourthSpanNumber.textContent = newValues[3].length;
    fifthSpanNumber.textContent = newValues[4].length;
    sixthSpanNumber.textContent = newValues[5].length;
    seventhSpanNumber.textContent = newValues[6].length;

    const date = new Date();
        const dayMonth = date.toLocaleString('ru', {
          month: 'long'
        });;
    requestHeader.textContent = localStorage.getItem('input');
    spanTitle.textContent = localStorage.getItem('filter');
    spanResults.textContent = parse.totalResults;
    spanMonth.textContent = dayMonth;
    // let d = new Date();
    // let ts = d.getTime();
    // let twelveDays = ts - (12 * 24 * 60 * 60 * 1000);
    // d.setUTCDate(twelveDays)
    // console.log(d.setUTCDate(twelveDays)) 

    //spanResults = 
    //console.log(resultsObj)
   
    // function setFields() {
    //     requestHeader = input
    //     console.log(requestHeader)
    // }
    // setFields();
    //cards = localStorage.getItem('cards');
    
    //const statistics = new Statistics(cards);
     

})();

