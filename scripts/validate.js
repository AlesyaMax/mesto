const showError = (form, input, errorMessage) => {
  const errorInput = form.querySelector(`#${input.id}-error`);
  input.classList.add('popup__input_type_error');
  errorInput.textContent = errorMessage;
}

const hideError = (form, input) => {
  const errorInput = form.querySelector(`#${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  errorInput.textContent = '';
}

const hasInvalidInput = (inputList) => {
  return inputList.some(function(input) {
    return !input.validity.valid;
  });
}

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  };
}

const validateInput = (form, input) => {
  if(!input.validity.valid) {
    showError(form, input, input.validationMessage);
  } else {
    hideError(form, input);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.popup__save');
  inputList.forEach(function(input) {
    input.required = true;
    input.addEventListener('input', function() {
      validateInput(form, input);
      toggleButtonState(inputList, submitButton)
    });
  })
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(function(form) {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
}

enableValidation();