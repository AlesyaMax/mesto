class FormValidator {
  constructor(classSettings, formToValidate) {
    this._classSettings = classSettings;
    this._form = formToValidate;
    this._inputSelector = classSettings.inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._classSettings.submitButtonSelector);
  }

  _showError(input) {
    const errorInput = this._form.querySelector(`#${input.id}-error`);
    this._form.classList.add(this._classSettings.inputErrorClass);
    errorInput.textContent = input.validationMessage;
  }
  
  _hideError(input) {
    const errorInput = this._form.querySelector(`#${input.id}-error`);
    this._form.classList.remove(this._classSettings.inputErrorClass);
    errorInput.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some(function(input) {
      return !input.validity.valid;
    });
  }

  _validateInput(input) {
    if(!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._button.classList.remove(this._classSettings.inactiveButtonClass);
      this._button.disabled = false;
    };
  };

  _disableSubmitButton() {
    this._button.classList.add(this._classSettings.inactiveButtonClass);
    this._button.disabled = true;
  }

  _setInputEventListeners(item) {
    item.required = true;
    item.addEventListener('input', () => {
      this._validateInput(item);
      this._toggleButtonState();
    })
  }

  enableValidation() {
    this._disableSubmitButton();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();;
      this._disableSubmitButton();
    });
    this._inputList.forEach(item => this._setInputEventListeners(item))
  } 
}

export {FormValidator}