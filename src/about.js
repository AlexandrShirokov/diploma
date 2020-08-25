import './pages/index.css';
import 'swiper/swiper-bundle.css';
import {CommitCard} from './js/components/CommitCard.js';
import {CommitCardList} from './js/components/CommitCardList.js';
import {GitHubApi} from './js/modules/GitHubApi.js';
import Swiper, { Navigation, Pagination } from 'swiper';

(function () {
  Swiper.use([Navigation, Pagination]);
    const swiper = new Swiper('.swiper-container', {
      init: false,
      observer: true,
      slidesPerView: 'auto',
      spaceBetween: 16,
      slidesPerGroup: 1,
      freeMode: true,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    //const commitsContainer = document.querySelector('.commits__container');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const templateCommits = document.querySelector('.template-commits').content.querySelector('.commits__card');
    const gitOptions = {
        url: 'https://api.github.com/repos/AlexandrShirokov/diploma/commits?sha=level-1&per_page=20',
        headers: {
        'Content-Type': 'application/json'
      }}

    ;
    const gitHubApi =  new GitHubApi(gitOptions);
    function createCommitsCardCallback(item) {
      const commitCard = new CommitCard(item, templateCommits);
      return commitCard.create()
    }
    const commitCardList = new CommitCardList(swiperWrapper, createCommitsCardCallback);
    //const dataStorage = new DataStorage();
    gitHubApi.getCommits().then(res => { 
        localStorage.setItem('commitsCards', JSON.stringify(res));
        const raw = localStorage.getItem('commitsCards');
        const parse = JSON.parse(raw);
        commitCardList.render(parse);
        swiper.init();
      }).catch(err => {
        console.log(err);
        });

})();