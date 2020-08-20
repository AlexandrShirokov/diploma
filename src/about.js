import './pages/index.css';
import {CommitCard} from './js/components/CommitCard.js';
import {CommitCardList} from './js/components/CommitCardList.js';
import {GitHubApi} from './js/modules/GitHubApi.js';

(function () {
    const commitsContainer = document.querySelector('.commits__container'); 
    const templateCommits = document.querySelector('.template-commits').content.querySelector('.commits__card');
    const gitOptions = {
        url: 'https://api.github.com/repos/AlexandrShirokov/diploma/commits',
        headers: {
        'Content-Type': 'application/json'
      }}

    ;
    const gitHubApi =  new GitHubApi(gitOptions);
    function createCommitsCardCallback(item) {
      const commitCard = new CommitCard(item, templateCommits);
      return commitCard.create()
    }
    const commitCardList = new CommitCardList(commitsContainer, createCommitsCardCallback);
    //const dataStorage = new DataStorage();
    gitHubApi.getCommits().then(res => { 
        localStorage.setItem('commitsCards', JSON.stringify(res));
        const raw = localStorage.getItem('commitsCards');
        const parse = JSON.parse(raw);
        commitCardList.render(parse);
      }).catch(err => {
        console.log(err);
        });


})();