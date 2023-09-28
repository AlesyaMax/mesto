import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupPhotoSelector, popupPhotoCaptionSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector(popupPhotoSelector);
    this._popupPhotoCaption = this._popup.querySelector(popupPhotoCaptionSelector);
  }

  openPopup(name, link) {
    this._popupPhoto.src = link;
    this._popupPhoto.alt = name;
    this._popupPhotoCaption.textContent = name;
    super.openPopup();
  }
}