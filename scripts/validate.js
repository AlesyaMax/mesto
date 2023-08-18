const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
};

const showError = (form, input, errorMessage, classSettings) => {
  const errorInput = form.querySelector(`#${input.id}-error`);
  input.classList.add(classSettings.inputErrorClass);
  errorInput.textContent = errorMessage;
}

const hideError = (form, input, classSettings) => {
  const errorInput = form.querySelector(`#${input.id}-error`);
  input.classList.remove(classSettings.inputErrorClass);
  errorInput.textContent = '';
}

const hasInvalidInput = (inputList) => {
  return inputList.some(function(input) {
    return !input.validity.valid;
  });
}

const toggleButtonState = (inputList, button, classSettings) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(classSettings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(classSettings.inactiveButtonClass);
    button.disabled = false;
  };
}

const validateInput = (form, input, classSettings) => {
  if(!input.validity.valid) {
    showError(form, input, input.validationMessage, classSettings);
  } else {
    hideError(form, input, classSettings);
  }
};

const setEventListeners = (form, classSettings) => {
  const inputList = Array.from(form.querySelectorAll(classSettings.inputSelector));
  const submitButton = form.querySelector(classSettings.submitButtonSelector);
  inputList.forEach(function(input) {
    input.required = true;
    toggleButtonState(inputList, submitButton, classSettings)
    input.addEventListener('input', function() {
      validateInput(form, input, classSettings);
      toggleButtonState(inputList, submitButton, classSettings)
    });
  })
};

const enableValidation = (classSettings) => {
  const formList = Array.from(document.querySelectorAll(classSettings.formSelector));
  formList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form, classSettings);
  });
}

enableValidation(settings);