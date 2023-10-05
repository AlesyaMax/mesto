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
  popupPhotoCaptionSelector: '.popup__caption',
  likeCounterSelector: '.elements__like-counter'
};

export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  profileFormSelector: 'popup_edit-profile',
  placeFormSelector: 'popup_add-place',
  deleteFormSelector: 'popup_delete',
  avatarFormSelector: 'popup_avatar'
};

export const profileSelectors = {
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar-photo'
}

export const buttonEditProfile = document.querySelector(".profile__edit");
export const buttonAddPlace = document.querySelector(".profile__add");
export const buttonDeleteCard = document.querySelector('.popup__save-delete');
export const buttonEditAvatar = document.querySelector(".profile__avatar-editor");
export const buttonSubmitUserInfo = document.querySelector(".button_submit_profile");
export const buttonSubmitAvatar = document.querySelector(".button_submit_avatar");
export const buttonSubmitCard = document.querySelector(".button_submit_card");



export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    authorization: '57922637-f12b-401e-b895-d561849d86af',
    'Content-Type': 'application/json'
  }
}