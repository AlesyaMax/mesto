import  { initialCards } from './cards.js';
import { selectors, settings } from "./constants.js";
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const popupProfileForm = document.querySelector(".popup__edit");
const popupProfile = document.querySelector(".popup_edit-profile");
const buttonEditProfile = document.querySelector(".profile__edit");

const inputName = popupProfileForm.querySelector(".popup__input_type_name");
const inputDescription = popupProfileForm.querySelector(".popup__input_type_description");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_source");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const popupNew = document.querySelector(".popup_add-place");
const buttonAddPlace = document.querySelector(".profile__add");
const popupNewPlaceForm = popupNew.querySelector(".popup__add");

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

const handleSubmitNewPlaceForm = (evt) => {
  evt.preventDefault();
  createInputCard();
  closePopup(popupNew);
  popupNewPlaceForm.reset();
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

const renderCard = (card) => {
  const newCard = card.createCard();
  const cardsContainer = document.querySelector(selectors.cardsContainer);
  cardsContainer.prepend(newCard);
}

const createNewCard = (cardName, cardLink, cardData) => {
  const newInitialCard = new Card (cardName, cardLink, cardData);
  renderCard(newInitialCard);
}

initialCards.forEach((item) => {
  createNewCard(item.name, item.link, selectors)
});

const createInputCard = () => {
  createNewCard(inputPlace.value, inputLink.value, selectors)
};

const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((form) => {
  const formToValidate = new FormValidator (settings, form);
  formToValidate.enableValidation();
})

setEventListenersOnPopups();
buttonEditProfile.addEventListener("click", showProfileForm);
popupProfileForm.addEventListener("submit", handleSubmitProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);
popupNewPlaceForm.addEventListener("submit", handleSubmitNewPlaceForm);