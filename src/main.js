// 📦 Імпорт бібліотек
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// 📦 Імпорт функцій
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js';


// 📌 DOM-елементи
const formEl = document.querySelector('.form');
const inputEl = document.querySelector('.form-input');

// 🧠 Основна логіка
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = inputEl.value.trim();

  if (!query) {
    iziToast.info({
      title: 'Info',
      message: 'Please enter a search query!',
      position: 'topCenter'
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const response = await getImagesByQuery(query);

    if (response.hits.length === 0) {
      iziToast.info({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter'
      });
      return;
    }

    createGallery(response.hits);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later.',
      position: 'topCenter'
    });
    console.error('Fetch error:', error);
  } finally {
    hideLoader();
  }
});
