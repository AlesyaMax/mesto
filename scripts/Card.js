import { openPopup } from "./index.js";
import { selectors, popupCard, popupPhoto, popupPhotoCaption } from "./constants.js";


class Card {
  constructor(name, link, templateData) {
    this._templateData = templateData;
    this._template = document.querySelector(this._templateData.templateSelector).content.querySelector(this._templateData.templateElement);
    this._name = name;
    this._link = link;
  }

  _handleDeleteClick() {
    const el = this.closest(selectors.templateElement);
    el.remove();
  };


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
    const card = this._template.cloneNode(true);
    const photo = card.querySelector(this._templateData.templatePhoto);
    const caption = card.querySelector(this._templateData.templateText);
    const deleteButton = card.querySelector(this._templateData.templateDeleteButton);
    const likeButton = card.querySelector(this._templateData.templateLikeButton);
    photo.alt = this._name;
    photo.src = this._link;
    caption.textContent = this._name;
    deleteButton.addEventListener("click", this._handleDeleteClick);
    likeButton.addEventListener("click", this._handleLikeClick);
    photo.addEventListener("click", this._openCardPopup);
    return card;
  }
}

export {Card};