import Popup from './Popup.js';
import { settings } from './constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputList = super._popup.querySelectorAll(settings.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  closePopup() {
    super.closePopup();
    super._popup.reset();
  }

  setEventListeners() {
    super.setEventListenersOnPopups();
    super._popup.addEventListener('submit', () => this._handleSubmitForm());
  }
}