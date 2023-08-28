import  {initialCards} from './cards.js';
import {selectors, Card} from './Card.js';


const popupProfileForm = document.querySelector(".popup__edit");
const popupProfile = document.querySelector(".popup_edit-profile");
const editButton = document.querySelector(".profile__edit");
const cardsContainer = document.querySelector(".elements");

const inputName = popupProfileForm.querySelector(".popup__input_type_name");
const inputDescription = popupProfileForm.querySelector(".popup__input_type_description");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_source");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const popupNew = document.querySelector(".popup_add-place");
const addButton = document.querySelector(".profile__add");
const popupNewPlaceForm = popupNew.querySelector(".popup__add");

const popupCard = document.querySelector(".popup_card");
const popupPhoto = popupCard.querySelector(".popup__photo");
const popupPhotoCaption = popupCard.querySelector(".popup__caption");

const template = document.querySelector(".card-template").content.querySelector(".elements__item");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape);
}

const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
  const openedPopup = document.querySelector('.popup_opened');
  closePopup(openedPopup)};
};

const showProfileForm = function () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
};

const showNewPlaceForm = function () {
  popupNewPlaceForm.reset();
  openPopup(popupNew);
};

const handleSubmitProfileForm = function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
};

/*const handleDeleteClick = (e) => {
  const el = e.target.closest(".elements__item");
  el.remove();
};

const handleLikeClick = (e) => {
  const el = e.target.closest(".elements__like");
  el.classList.toggle("elements__like_active");
};

const handleClickPhoto = (e) => {
  e.target.closest(".card").querySelector(".popup-photo").classList.toggle("popup-photo_opened");
};

const openCardPopup = (evt) => {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.alt;
  popupPhotoCaption.textContent = evt.target.alt;
  openPopup(popupCard);
};

function createCard(cardData) {
  const card = template.cloneNode(true);
  const photo = card.querySelector(".elements__photo");
  const caption = card.querySelector(".elements__text");
  const deleteButton = card.querySelector(".elements__delete");
  const likeButton = card.querySelector(".elements__like");
  photo.alt = cardData.name;
  photo.src = cardData.link;
  caption.textContent = cardData.name;
  deleteButton.addEventListener("click", handleDeleteClick);
  likeButton.addEventListener("click", handleLikeClick);
  photo.addEventListener("click", openCardPopup);
  return card;
}

function renderCard(cardData) {
  const newCard = createCard(cardData);
  cardsContainer.prepend(newCard);
}

const createInitialCards = initialCards.forEach(function (element) {
  renderCard(element);
});

const createNewCards = () => {
  const cardData = { name: inputPlace.value, link: inputLink.value };
  renderCard(cardData);
};*/

const handleSubmitNewPlaceForm = (evt) => {
  evt.preventDefault();
  createNewCards();
  closePopup(popupNew);
  popupNewPlaceForm.reset();
  const submitPlaceButton = popupNewPlaceForm.querySelector(settings.submitButtonSelector);
  submitPlaceButton.disabled = true;
  submitPlaceButton.classList.add(settings.inactiveButtonClass)
};

const closeByCloseButtonOrOverlay = (popup) => {
  popup.addEventListener('mousedown', function(evt) {
    if (evt.target.classList.contains('popup_opened') 
    || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
}

const setEventListenersOnPopups = () => {
const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(function(popupElement) {
    closeByCloseButtonOrOverlay(popupElement);
  })
};

setEventListenersOnPopups();
editButton.addEventListener("click", showProfileForm);
popupProfileForm.addEventListener("submit", handleSubmitProfileForm);
addButton.addEventListener("click", showNewPlaceForm);
popupNewPlaceForm.addEventListener("submit", handleSubmitNewPlaceForm);


//

initialCards.forEach((item) => {
  const newInitialCard = new Card (item.name, item.link, selectors);
  newInitialCard.renderCard();
});

const createNewCards = () => {
  const newInputCard = new Card (inputPlace.value, inputLink.value, selectors);
  newInputCard.renderCard();
}