import { cardTemplateSelectors } from "../utils/constants.js";


class Card {
  constructor({name, link, handleCardClick},templateData) {
    this._templateData = templateData;
    this._template = document.querySelector(this._templateData.templateSelector).content.querySelector(this._templateData.templateElement);
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeClick() {
    this.classList.toggle(cardTemplateSelectors.likeIsActive);
  };

  _removeCard() {
    this._card.remove();
    this._card = null;
  }

  createCard() {
    this._card = this._template.cloneNode(true);
    const photo = this._card.querySelector(this._templateData.templatePhoto);
    const caption = this._card.querySelector(this._templateData.templateText);
    const deleteButton = this._card.querySelector(this._templateData.templateDeleteButton);
    const likeButton = this._card.querySelector(this._templateData.templateLikeButton);
    photo.alt = this._name;
    photo.src = this._link;
    caption.textContent = this._name;
    deleteButton.addEventListener("click", () => this._removeCard());
    likeButton.addEventListener("click", this._handleLikeClick);
    photo.addEventListener("click", () => this._handleCardClick(this._name, this._link));
    return this._card;
  }
}

export {Card};