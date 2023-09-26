import  { initialCards } from './cards.js';
import { 
  cardTemplateSelectors, 
  formSelectors,
  buttonEditProfile,
  buttonAddPlace,
  inputName,
  inputDescription,
  profileName,
  profileDescription 
} from "./constants.js";
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const popupProfileForm = new PopupWithForm(formSelectors.profileFormSelector, {
  handleSubmitForm: (dataSet) => {
    profileName.textContent = dataSet.userName;
    profileDescription.textContent = dataSet.userDescription;
    popupProfileForm.closePopup();
  }
});

const popupPlaceForm = new PopupWithForm(formSelectors.placeFormSelector, {
  handleSubmitForm: (dataSet) => {
    const newInputCard = createNewCard({
      name: dataSet.photoName, 
      link: dataSet.photoSource,
      handleCardClick: (name, link) => {const popupCard = new PopupWithImage(cardTemplateSelectors.popupCardSelector);
        popupCard.openPopup(name, link);
        popupCard.setEventListenersOnPopups()}
        }, 
        cardTemplateSelectors);
    renderCard(newInputCard);
    popupPlaceForm.closePopup();
  }
})

popupProfileForm.setEventListeners();
popupPlaceForm.setEventListeners();

const showProfileForm = () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popupProfileForm.openPopup();
};

const showNewPlaceForm = () => {
  popupPlaceForm.openPopup();
};

const renderCard = (card) => {
  const cardsContainer = document.querySelector(cardTemplateSelectors.cardsContainer);
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
      handleCardClick: (name, link) => {const popupCard = new PopupWithImage(cardTemplateSelectors.popupCardSelector);
      popupCard.openPopup(name, link);
      popupCard.setEventListenersOnPopups()}
      }, 
      cardTemplateSelectors);
    initialCardList.addItem(newInitialCard);
  }
  },
  cardTemplateSelectors.cardsContainer
);

initialCardList.renderItem();

const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));

formList.forEach((form) => {
  const formToValidate = new FormValidator (formSelectors, form);
  formToValidate.enableValidation();
})

buttonEditProfile.addEventListener("click", showProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);