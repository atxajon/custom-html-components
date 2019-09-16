import './news-article.js';
import {topHeadlinesUrl} from './newsApi.js';

// By delaying this until the page is loaded the experience is more smooth. Do not block initial render with js.
window.addEventListener('load', () => {
  fetchNews();
  registerSW();
});

async function fetchNews() {
  const res = await fetch(topHeadlinesUrl);
  const json = await res.json();
  const main = document.querySelector('main');
  json.articles.forEach(article => {
    const el = document.createElement('news-article');
    el.pulledArticle = article;
    main.appendChild(el);
  });
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}