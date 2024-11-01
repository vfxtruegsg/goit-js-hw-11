// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputDate = document.querySelector('.input-date');
const startButton = document.querySelector('.start-btn');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate;
let countdownInterval;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      startButton.classList.remove('active-button');
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
      startButton.classList.add('active-button');
    }
  },
};

flatpickr(inputDate, options);

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval); // Очищення попереднього інтервалу, якщо він існує

  startButton.disabled = true;
  startButton.classList.remove('active-button');
  inputDate.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Complete',
        message: 'Countdown complete!',
        position: 'topRight',
      });
      inputDate.disabled = false;
      startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    // Оновлюємо значення таймера в DOM
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

// Додаємо обробник події для кнопки "Start"
startButton.addEventListener('click', startCountdown);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
