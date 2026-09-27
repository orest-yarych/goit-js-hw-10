import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  messageColor: '#FFFFFF',
});

const refs = {
  form: document.querySelector('.form'),
};

function createPromise(delay, state) {
  return new Promise((res, rej) => {
    if (state === 'fulfilled') {
      setTimeout(() => res(delay), delay);
    } else {
      setTimeout(() => rej(delay), delay);
    }
  });
}

function showSuccess(delay) {
  iziToast.success({
    icon: '',
    backgroundColor: '#59A10D',
    message: `✅ Fulfilled promise in ${delay}ms`,
  });
}

function showError(delay) {
  iziToast.error({
    icon: '',
    message: `❌ Rejected promise in ${delay}ms`,
    backgroundColor: '#EF4040',
  });
}

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const { delay, state } = Object.fromEntries(new FormData(form));
  createPromise(delay, state)
    .then(delay => {
      showSuccess(delay);
    })
    .catch(delay => {
      showError(delay);
    });
  form.reset();
}
