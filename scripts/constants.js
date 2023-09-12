export const selectors = {
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

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
};

export const popupCard = document.querySelector(selectors.popupCardSelector);
export const popupPhoto = popupCard.querySelector(selectors.popupPhotoSelector);
export const popupPhotoCaption = popupCard.querySelector(selectors.popupPhotoCaptionSelector);