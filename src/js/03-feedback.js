import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackData = {};

onReloadPage();
form.addEventListener('input', throttle(saveFeedback, 500));
form.addEventListener('submit', onFormSubmit);

function saveFeedback(event) {
  feedbackData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const submitedFeedback = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (submitedFeedback) {
    console.log(submitedFeedback);
  }

  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onReloadPage() {
  const feedback = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (feedback) {
    form.elements.email.value = feedback.email;
    form.elements.message.value = feedback.message;
  }
}
