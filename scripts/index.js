import  { initialCards } from './cards.js';
import { selectors, settings } from "./constants.js";
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';

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

const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(function(popupElement) {
    const popupClass = new Popup(popupElement.id);
    popupClass.setEventListenersOnPopups();
  })

const renderCard = (card) => {
  const cardsContainer = document.querySelector(selectors.cardsContainer);
  cardsContainer.prepend(card);
}

const createNewCard = (cardName, cardLink, cardData, handleCardClick) => {
  const newCardObject = new Card (cardName, cardLink, cardData, handleCardClick);
  const newCard = newCardObject.createCard();
  return newCard;
}

const initialCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newInitialCard = createNewCard({
      name: item.name, 
      link: item.link,
      handleCardClick: (name, link) => {const popupCard = new PopupWithImage(selectors.popupCardSelector);
      popupCard.openPopup(name, link);}
      }, 
      selectors);
    initialCardList.addItem(newInitialCard);
  }
  },
  selectors.cardsContainer
);

initialCardList.renderItem();

const createInputCard = () => {
  const newInputCard = createNewCard({
    name: inputPlace.value, 
    link: inputLink.value,
    handleCardClick: (name, link) => {const popupCard = new PopupWithImage(selectors.popupCardSelector);
      popupCard.openPopup(name, link);}
      }, 
      selectors);
  renderCard(newInputCard);
}

const formList = Array.from(document.querySelectorAll(settings.formSelector));

formList.forEach((form) => {
  const formToValidate = new FormValidator (settings, form);
  formToValidate.enableValidation();
})

buttonEditProfile.addEventListener("click", showProfileForm);
popupProfileForm.addEventListener("submit", handleSubmitProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);
popupNewPlaceForm.addEventListener("submit", handleSubmitNewPlaceForm);