import './index.css';
import  { initialCards } from '../utils/cards.js';
import { 
  cardTemplateSelectors, 
  formSelectors,
  profileSelectors,
  buttonEditProfile,
  buttonAddPlace,
  inputName,
  inputDescription
} from "../utils/constants.js";
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo(profileSelectors.nameSelector, profileSelectors.descriptionSelector);

const popupProfileForm = new PopupWithForm(formSelectors.profileFormSelector, {
  handleSubmitForm: () => {
    userInfo.setUserInfo();
    popupProfileForm.closePopup();
  }
});

const popupNewPlaceForm = new PopupWithForm(formSelectors.placeFormSelector, {
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
    popupNewPlaceForm.closePopup();
  }
})

const showProfileForm = () => {
  const profileInfo = userInfo.getUserInfo();
  inputName.value = profileInfo.name;
  inputDescription.value = profileInfo.description;
  popupProfileForm.openPopup();
};

const showNewPlaceForm = () => {
  popupNewPlaceForm.openPopup();
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

popupProfileForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
buttonEditProfile.addEventListener("click", showProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);