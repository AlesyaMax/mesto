import './index.css';
import  { initialCards } from '../utils/cards.js';
import { 
  cardTemplateSelectors, 
  formSelectors,
  profileSelectors,
  buttonEditProfile,
  buttonAddPlace
} from "../utils/constants.js";
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo(profileSelectors.nameSelector, profileSelectors.descriptionSelector);

const formsToValidate = {};

const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));

formList.forEach((form) => {
  const formToValidate = new FormValidator (formSelectors, form);
  formToValidate.enableValidation();
  formsToValidate[form.name] = formToValidate;
})

const popupProfileForm = new PopupWithForm(formSelectors.profileFormSelector, {
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupProfileForm.closePopup();
  }
});

const popupNewPlaceForm = new PopupWithForm(formSelectors.placeFormSelector, {
  handleSubmitForm: (dataSet) => {
    const newInputCard = createNewCard({
      name: dataSet.photoName, 
      link: dataSet.photoSource,
      handleCardClick: (name, link) => {const popupCard = new PopupWithImage(
          cardTemplateSelectors.popupCardSelector,
          cardTemplateSelectors.popupPhotoSelector,
          cardTemplateSelectors.popupPhotoCaptionSelector
          );
        popupCard.openPopup(name, link);
        }
      }, 
      cardTemplateSelectors);
    cardList.addItem(newInputCard);
    popupNewPlaceForm.closePopup();
  }
})

const showProfileForm = () => {
  const profileInfo = userInfo.getUserInfo();
  popupProfileForm.openPopup(formsToValidate);
  formsToValidate["editForm"].resetValidation();
  popupProfileForm.setInputValues(profileInfo);
};

const showNewPlaceForm = () => {
  popupNewPlaceForm.openPopup(formsToValidate);
  formsToValidate["newForm"].resetValidation();
};

const createNewCard = (cardName, cardLink, cardData, handleCardClick) => {
  const newCardObject = new Card (cardName, cardLink, cardData, handleCardClick);
  const newCard = newCardObject.createCard();
  return newCard;
}

const popupCards = [];

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const popupCard = new PopupWithImage(
      cardTemplateSelectors.popupCardSelector,
      cardTemplateSelectors.popupPhotoSelector,
      cardTemplateSelectors.popupPhotoCaptionSelector
      );
    popupCards.push(popupCard);
   
    const newInitialCard = createNewCard({
      name: item.name, 
      link: item.link,
      handleCardClick: (name, link) => {
        popupCard.openPopup(name, link);
        }
      }, 
      cardTemplateSelectors);
    
    cardList.addItem(newInitialCard);}
  },
  cardTemplateSelectors.cardsContainer
);

cardList.renderItem();

popupCards.forEach(cardPopup => cardPopup.setEventListeners());
popupProfileForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
buttonEditProfile.addEventListener("click", showProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);