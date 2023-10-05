import './index.css';
import { 
  cardTemplateSelectors, 
  formSelectors,
  profileSelectors,
  buttonEditProfile,
  buttonAddPlace,
  buttonDeleteCard,
  apiOptions,
  buttonEditAvatar,
  buttonSubmitUserInfo,
  buttonSubmitAvatar,
  buttonSubmitCard
} from "../utils/constants.js";
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/API.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

let myUserInfo = {};

const cards = []

const api = new Api(apiOptions);

Promise.all([api.getUserInfo(), api.getCards()])
.then(([userInfo, cardsInfo]) => {
  myUserInfo = userInfo;
  document.querySelector(profileSelectors.nameSelector).textContent = myUserInfo.name;
  document.querySelector(profileSelectors.descriptionSelector).textContent = myUserInfo.about;
  document.querySelector(profileSelectors.avatarSelector).src = myUserInfo.avatar;
  
  cardsInfo.forEach(cardItem => cards.push(cardItem))
  cardList.renderItem(cards);
})

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
    renderLoading(true, buttonSubmitUserInfo, 'Сохранить');
    api.editUserInfo({
        name: document.querySelector('.popup__input_type_name').value,
        about: document.querySelector('.popup__input_type_description').value
      })
    .then(() => {
      renderLoading(false, buttonSubmitUserInfo, 'Сохранить');
    })
    .catch((err) => {
      console.log(err);
    })
    userInfo.setUserInfo(data);
    popupProfileForm.closePopup();
  }
});

const popupDeleteCard = new PopupWithConfirmation(formSelectors.deleteFormSelector);

const popupNewPlaceForm = new PopupWithForm(formSelectors.placeFormSelector, {
  handleSubmitForm: (dataSet) => {
    renderLoading(true, buttonSubmitCard, 'Создать');
    api.addNewCard({
        name: dataSet.photoName,
        link: dataSet.photoSource,
      })
    .then((cardInfo) => {
      const newCard = createNewCard(cardInfo);
      cardList.addItem(newCard);
      renderLoading(false, buttonSubmitCard, 'Создать');
      popupNewPlaceForm.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
  }
})

const popupAvatarForm = new PopupWithForm(formSelectors.avatarFormSelector, {
  handleSubmitForm: (data) => {
    renderLoading(true, buttonSubmitAvatar, 'Сохранить');
    api.editAvatar({
      avatar: data.avatarSource
    })
    .then((newInfo) => {
      document.querySelector(profileSelectors.avatarSelector).src = newInfo.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
    renderLoading(false, buttonSubmitAvatar, 'Сохранить');
    popupAvatarForm.closePopup();
  }
})

const showProfileForm = () => {
  const profileInfo = userInfo.getUserInfo();
  popupProfileForm.openPopup(formsToValidate);
  formsToValidate["editForm"].resetValidation();
  popupProfileForm.setInputValues(profileInfo);
};

const showAvatarForm = () => {
  popupAvatarForm.openPopup(formsToValidate);
  formsToValidate["editAvatarForm"].resetValidation();
}

const showNewPlaceForm = () => {
  popupNewPlaceForm.openPopup(formsToValidate);
  formsToValidate["newForm"].resetValidation();
};

const popupCard = new PopupWithImage(
  cardTemplateSelectors.popupCardSelector,
  cardTemplateSelectors.popupPhotoSelector,
  cardTemplateSelectors.popupPhotoCaptionSelector
  );

const createNewCard = (cardInfo) => {
  const newCard = new Card ({
    cardData: cardInfo,
    userID: myUserInfo._id,
    handleCardClick: () => {
      popupCard.openPopup(cardInfo.name, cardInfo.link)
    },
    handleLikeClick: () => {
      if(cardInfo.likes.find(like => like._id === myUserInfo._id)) {
        api.removeLike(cardInfo._id)
        .then((data) => {
          newCard.removeLike(data)
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.addLike(cardInfo._id)
        .then((data) => {
          newCard.addLike(data)
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    handleDeleteClick: () => {
      buttonDeleteCard.classList.remove(formSelectors.inactiveButtonClass);
      buttonDeleteCard.disabled = false;
      popupDeleteCard.openPopup();
      popupDeleteCard.setSubmit(() => {
        api.deleteCard(cardInfo._id)
        .then(() => {
          newCard.removeCard();
          popupDeleteCard.closePopup();
        })
        .catch((err) => {
          console.log(err);
        })
      })
    }
  },
  cardTemplateSelectors)
  return newCard.createCard();
};

const cardList = new Section({
  renderer: (cards) => {
    const card = createNewCard(cards);
    cardList.addItem(card)
  }
  },
  cardTemplateSelectors.cardsContainer
);

const renderLoading = (isLoading, button, text) => {
  if(isLoading) {
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = text
  }
}

popupCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupProfileForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
buttonEditProfile.addEventListener("click", showProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);
buttonEditAvatar.addEventListener("click", showAvatarForm)