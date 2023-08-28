import { openPopup } from "./index.js";

const selectors = {
  templateSelector: '.card-template',
  templateElement: '.elements__item',
  templatePhoto: '.elements__photo',
  templateText: '.elements__text',
  templateDeleteButton: '.elements__delete',
  templateLikeButton: '.elements__like',
  cardsContainer: '.elements'
};

class Card {
  constructor(name, link, templateData) {
    this._template = document.querySelector(templateData.templateSelector).content.querySelector(templateData.templateElement);
    this._templateData = templateData;
    this._name = name;
    this._link = link;
  }

  _handleDeleteClick(e) {
    const el = e.target.closest(".elements__item");
    el.remove();
  };
  
  _handleLikeClick(e) {
    const el = e.target.closest(".elements__like");
    el.classList.toggle("elements__like_active");
  };
  
  _handleClickPhoto = (e) => {
    e.target.closest(".card").querySelector(".popup-photo").classList.toggle("popup-photo_opened");
  };

  _openCardPopup(e) {
    const popupCard = document.querySelector(".popup_card");
    const popupPhoto = popupCard.querySelector(".popup__photo");
    const popupPhotoCaption = popupCard.querySelector(".popup__caption"); 
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