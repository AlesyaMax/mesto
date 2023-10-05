class Card {
  constructor({cardData, userID, handleCardClick, handleLikeClick, handleDeleteClick},templateData) {
    this._templateData = templateData;
    this._template = document.querySelector(this._templateData.templateSelector).content.querySelector(this._templateData.templateElement);
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._likesNumber = this._likes.length;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._ownerID = cardData.owner._id;
    this._userID = userID;
  }

  updateLikes(newData) {
    this._likes = newData.likes
    this.updateLikesView();
  }

  updateLikesView() {
    this._likeCounter.textContent = this._likes.length;
    if(this._likes.find(like => like._id === this._userID)) {
      this._likeButton.classList.add(this._templateData.likeIsActive);
    } else {
      this._likeButton.classList.remove(this._templateData.likeIsActive)
    }
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  _checkOwner() {
    if(this._userID !== this._ownerID) {
      this._deleteButton.remove();
    }
  }

  createCard() {
    this._card = this._template.cloneNode(true);
    this._photo = this._card.querySelector(this._templateData.templatePhoto);
    this._caption = this._card.querySelector(this._templateData.templateText);
    this._deleteButton = this._card.querySelector(this._templateData.templateDeleteButton);
    this._likeButton = this._card.querySelector(this._templateData.templateLikeButton);
    this._likeCounter = this._card.querySelector(this._templateData.likeCounterSelector);
    this._photo.alt = this._name;
    this._photo.src = this._link;
    this._caption.textContent = this._name;
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick());
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._likeButton, this._likeCounter)
    });
    this._photo.addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._checkOwner();
    this.updateLikesView();
    return this._card;
  }
}

export {Card};