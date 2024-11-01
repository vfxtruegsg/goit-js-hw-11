// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createNewPromise);

function createNewPromise(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const radioValue = formData.get('state');

  setTimeout(() => {
    let promise = new Promise((resolve, reject) => {
      if (radioValue === 'fulfilled') {
        resolve(delay);
      } else if (radioValue === 'rejected') {
        reject(delay);
      }
    });

    promise
      .then(message => {
        iziToast.success({
          title: '✅',
          message: `Fulfilled promise in ${message}ms`,
          position: 'topRight',
          timeout: 3000,
          transitionIn: 'fadeInLeft',
          transitionOut: 'fadeOutRight',
        });
      })
      .catch(error => {
        iziToast.error({
          title: '❌',
          message: `Rejected promise in ${error}ms`,
          position: 'topRight',
          timeout: 3000,
          transitionIn: 'fadeInLeft',
          transitionOut: 'fadeOutRight',
        });
      });
  }, delay);
  form.reset();
}
