export const cardTemplateSelectors = {
  templateSelector: '.card-template',
  templateElement: '.elements__item',
  templatePhoto: '.elements__photo',
  templateText: '.elements__text',
  templateDeleteButton: '.elements__delete',
  templateLikeButton: '.elements__like',
  likeIsActive: 'elements__like_active',
  cardsContainer: '.elements',
  popupCardSelector: 'popup_card',
  popupPhotoSelector: '.popup__photo',
  popupPhotoCaptionSelector: '.popup__caption'
};

export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  profileFormSelector: 'popup_edit-profile',
  placeFormSelector: 'popup_add-place'
};

const profileFormElement = document.querySelector(".popup__edit");
export const buttonEditProfile = document.querySelector(".profile__edit");
export const inputName = profileFormElement.querySelector(".popup__input_type_name");
export const inputDescription = profileFormElement.querySelector(".popup__input_type_description");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const buttonAddPlace = document.querySelector(".profile__add");