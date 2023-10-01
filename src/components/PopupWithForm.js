import Popup from './Popup.js';
import { formSelectors } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelectors.formSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = this._form.querySelectorAll(formSelectors.inputSelector);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  } 

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  };
}