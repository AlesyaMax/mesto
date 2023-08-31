const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
};

class FormValidator {
  constructor(classSettings, elementToValidate) {
    this._classSettings = classSettings;
    this._element = elementToValidate;
    this._input = classSettings.inputSelector;
  }

  _showError() {
    const errorInput = this._element.parentNode.querySelector(`#${this._element.id}-error`);
    this._element.classList.add(this._classSettings.inputErrorClass);
    errorInput.textContent = this._element.validationMessage;
  }
  
  _hideError() {
    const errorInput = this._element.parentNode.querySelector(`#${this._element.id}-error`);
    this._element.classList.remove(this._classSettings.inputErrorClass);
    errorInput.textContent = '';
  }

  _hasInvalidInput() {
    const inputList = Array.from(this._element.parentNode.querySelectorAll(this._input));
    return inputList.some(function(input) {
      return !input.validity.valid;
    });
  }

  _validateInput(input) {
    if(!input.validity.valid) {
      this._showError();
    } else {
      this._hideError();
    }
  }

  _toggleButtonState() {
    const button = this._element.parentNode.querySelector(this._classSettings.submitButtonSelector);
    if (this._hasInvalidInput()) {
      button.classList.add(this._classSettings.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._classSettings.inactiveButtonClass);
      button.disabled = false;
    };
  };

  _setEventListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._input));
    inputList.forEach(function(input) {
      input.required = true;
      const inputToValidate = new FormValidator (settings, input);
      inputToValidate._toggleButtonState();
      input.addEventListener('input', function() {
        inputToValidate._validateInput(input);
        inputToValidate._toggleButtonState();
      })
    })
  };

  enableValidation() {
    const form = this._element;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    });
    this._setEventListeners();
  } 

}


export {settings, FormValidator}