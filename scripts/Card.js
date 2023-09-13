import { openPopup } from "./index.js";
import { selectors, popupCard, popupPhoto, popupPhotoCaption } from "./constants.js";


class Card {
  constructor(name, link, templateData) {
    this._templateData = templateData;
    this._template = document.querySelector(this._templateData.templateSelector).content.querySelector(this._templateData.templateElement);
    this._name = name;
    this._link = link;
  }

  _handleLikeClick() {
    this.classList.toggle(selectors.likeIsActive);
  };

  _openCardPopup() {
    popupPhoto.src = this.src;
    popupPhoto.alt = this.alt;
    popupPhotoCaption.textContent = this.alt;
    openPopup(popupCard);
  };

  createCard() {
    this._card = this._template.cloneNode(true);
    const photo = this._card.querySelector(this._templateData.templatePhoto);
    const caption = this._card.querySelector(this._templateData.templateText);
    const deleteButton = this._card.querySelector(this._templateData.templateDeleteButton);
    const likeButton = this._card.querySelector(this._templateData.templateLikeButton);
    photo.alt = this._name;
    photo.src = this._link;
    caption.textContent = this._name;
    deleteButton.addEventListener("click", () => this._card.remove());
    likeButton.addEventListener("click", this._handleLikeClick);
    photo.addEventListener("click", this._openCardPopup);
    return this._card;
  }
}

export {Card};