import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackData = {};

onPageReload();
form.addEventListener('input', throttle(saveFeedbackToStorage, 500));
form.addEventListener('submit', onFormSubmit);

function saveFeedbackToStorage(event) {
  feedbackData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedbackData));
}

function onFormSubmit(event) {
  event.preventDefault();

  feedbackData.email = form.elements.email.value;
  feedbackData.message = form.elements.message.value;
  console.log(feedbackData);

  event.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onPageReload() {
  try {
    const feedback = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (feedback) {
      form.elements.email.value = feedback.email;
      form.elements.message.value = feedback.message;
    }
  } catch (error) {
    console.error(error.message);
  }
}
