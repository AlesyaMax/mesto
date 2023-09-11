import { settings } from "./constants.js"

class FormValidator {
  constructor(classSettings, elementToValidate) {
    this._classSettings = classSettings;
    this._element = elementToValidate;
    this._inputSelector = classSettings.inputSelector;
    this._inputList = Array.from(this._element.parentNode.querySelectorAll(this._inputSelector));
    this._button = this._element.parentNode.querySelector(this._classSettings.submitButtonSelector);
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
    return this._inputList.some(function(input) {
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
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._classSettings.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._classSettings.inactiveButtonClass);
      this._button.disabled = false;
    };
  };

  _setEventListeners() {
    this._inputList.forEach(function(input) {
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
    this._element.addEventListener('submit', function(e) {
      e.preventDefault();
    });
    this._setEventListeners();
  } 

}

export {FormValidator}