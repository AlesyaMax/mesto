import {cardTemplateSelectors} from '../utils/constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector(cardTemplateSelectors.popupPhotoSelector);
    this._popupPhotoCaption = this._popup.querySelector(cardTemplateSelectors.popupPhotoCaptionSelector);
  }

  openPopup(name, link) {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupPhotoCaption.textContent = name;
    super.openPopup();
  }
}