import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
});

function showErrorMessage() {
  iziToast.error({
    message: 'Please choose a date in the future',
    icon: 'fa fa-times-circle',
    backgroundColor: '#d32f2f',
    messageColor: '#fff',
    iconColor: '#fff',
  });
}

let userSelectedDate;
let currentDate;

const refs = {
  startBtn: document.querySelector('.timer-container button'),
  datetimePicker: document.querySelector('#datetime-picker'),
  days: document.querySelector('.timer span[data-days]'),
  hours: document.querySelector('.timer span[data-hours]'),
  minutes: document.querySelector('.timer span[data-minutes]'),
  seconds: document.querySelector('.timer span[data-seconds]'),
};

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

function updateTimer(time) {
  let { days, hours, minutes, seconds } = convertMs(time);

  refs.days.textContent = correctTime(days);
  refs.hours.textContent = correctTime(hours);
  refs.minutes.textContent = correctTime(minutes);
  refs.seconds.textContent = correctTime(seconds);
}

function correctTime(number) {
  return String(number).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      showErrorMessage();
      refs.startBtn.disabled = true;
      return;
    }
    const diff = userSelectedDate - currentDate;
    updateTimer(diff);
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

function disableContols() {
  refs.startBtn.disabled = true;
  refs.datetimePicker.disabled = true;
}

function onStartBtnClick() {
  disableContols();
  let diff;
  let timerCounterId = setInterval(() => {
    diff = userSelectedDate - Date.now();
    if (diff > 0) {
      updateTimer(diff);
    } else {
      clearInterval(timerCounterId);
      refs.datetimePicker.disabled = false;
    }
  }, 1000);
}
