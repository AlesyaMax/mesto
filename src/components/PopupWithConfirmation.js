import Popup from './Popup.js';
import { formSelectors } from '../utils/constants.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelectors.formSelector);
  };

  setSubmit(submit) {
    this._handleSubmitConfirmation = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitConfirmation();
    })
  }
}