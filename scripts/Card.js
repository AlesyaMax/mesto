import { openPopup } from "./index.js";

const selectors = {
  templateSelector: '.card-template',
  templateElement: '.elements__item',
  templatePhoto: '.elements__photo',
  templateText: '.elements__text',
  templateDeleteButton: '.elements__delete',
  templateLikeButton: '.elements__like',
  likeIsActive: 'elements__like_active',
  cardsContainer: '.elements',
  popupCardSelector: '.popup_card',
  popupPhotoSelector: '.popup__photo',
  popupPhotoCaptionSelector: '.popup__caption'
};

class Card {
  constructor(name, link, templateData) {
    this._templateData = templateData;
    this._template = document.querySelector(this._templateData.templateSelector).content.querySelector(this._templateData.templateElement);
    this._name = name;
    this._link = link;
  }

  _handleDeleteClick(e) {
    const el = e.target.parentNode;
    el.remove();
  };
  
  _handleLikeClick(e) {
    const el = e.target;
    el.classList.toggle(selectors.likeIsActive);
  };

  _openCardPopup(e) {
    const popupCard = document.querySelector(selectors.popupCardSelector);
    const popupPhoto = popupCard.querySelector(selectors.popupPhotoSelector);
    const popupPhotoCaption = popupCard.querySelector(selectors.popupPhotoCaptionSelector); 
    popupPhoto.src = e.target.src;
    popupPhoto.alt = e.target.alt;
    popupPhotoCaption.textContent = e.target.alt;
    openPopup(popupCard);
  };

  _createCard() {
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
  
  renderCard() {
    const newCard = this._createCard();
    const cardsContainer = document.querySelector(this._templateData.cardsContainer);
    cardsContainer.prepend(newCard);
  }
}

export {selectors, Card};