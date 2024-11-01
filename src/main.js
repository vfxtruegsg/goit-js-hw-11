// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46841282-5db11f3b406bb735b1a036109';
const form = document.querySelector('.search-container');
const list = document.querySelector('.list-photo');
const loader = document.querySelector('.loader');

form.addEventListener('submit', searchPictures);

function searchPictures(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.query.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: '❌',
      message: 'Please enter your request',
      position: 'topRight',
      timeout: 3000,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOutRight',
    });
    return;
  }

  fetchData(searchQuery)
    .then(data => {
      if (!data.total) {
        iziToast.error({
          title: '❌',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 3000,
          transitionIn: 'fadeInLeft',
          transitionOut: 'fadeOutRight',
        });
      }

      list.innerHTML = createMarkup(data.hits);
      gallery.refresh();
    })
    .catch(error => {
      throw new Error(error);
    });
}

function fetchData(searchQuery) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
    <a class="gallery-link" href=${largeImageURL} >
    <img
      class="gallery-image"
      src=${webformatURL}
      alt=${tags}
      width="360" height ="152"
    />
  </a>
  <div class="description">
  <ul class="list-points">
  <li class="items-points">
  <p>Likes</p>
  <p>${likes}</p>
  </li>
  <li class="items-points">
  <p>Views</p>
  <p>${views}</p>
  </li>
  <li class="items-points">
  <p>Comments</p>
  <p>${comments}</p>
  </li>
  <li class="items-points">
  <p>Downloads</p>
  <p>${downloads}</p>
  </li>

  </ul>
  </div>
</li>  
    `
    )
    .join('');
}

const gallery = new SimpleLightbox('.gallery-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
