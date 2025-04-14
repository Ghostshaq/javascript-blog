'use strict';

// 1. Generate authors list
function generateAuthors() {
  const allAuthors = {};

  const articles = document.querySelectorAll('.post');
  for (let article of articles) {
    const authorWrapper = article.querySelector('.post-author');
    const authorText = authorWrapper.innerText.replace('by ', '').trim();

    const authorHTML = `<a href="#author-${authorText}">${authorText}</a>`;
    authorWrapper.innerHTML = authorHTML;

    if (!allAuthors[authorText]) {
      allAuthors[authorText] = 1;
    } else {
      allAuthors[authorText]++;
    }
  }

  const authorsList = document.querySelector('.list.authors');
  let allAuthorsHTML = '';

  for (let author in allAuthors) {
    allAuthorsHTML += `<li><a href="#author-${author}">${author}</a> <span>(${allAuthors[author]})</span></li>`;
  }

  authorsList.innerHTML = allAuthorsHTML;
}

// 2. Click on author to filter articles
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  generateTitleLinks(`[data-author="${author}"]`);
}

// 3. Add click listeners to authors
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.list.authors a, .post-author a');

  for (let link of authorLinks) {
    link.addEventListener('click', authorClickHandler);
  }
}

// 4. Generate title links (showing only articles of the selected author)
function generateTitleLinks(selector = '') {
  const titleList = document.querySelector('.titles');
  titleList.innerHTML = '';

  const articles = document.querySelectorAll('.post' + selector);

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;

    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    titleList.innerHTML += linkHTML;
  }

  const links = titleList.querySelectorAll('a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

// 5. Handle the click on article title
function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.post.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const href = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(href);
  targetArticle.classList.add('active');
}

// 6. Add data-author attribute to articles (helpful for filtering)
function addAuthorDataAttributes() {
  const articles = document.querySelectorAll('.post');
  for (let article of articles) {
    const author = article.querySelector('.post-author a')?.innerText || '';
    if (author) {
      article.setAttribute('data-author', author);
    }
  }
}

// Initialize
generateAuthors();
generateTitleLinks();
addClickListenersToAuthors();
addAuthorDataAttributes();

  