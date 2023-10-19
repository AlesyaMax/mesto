import "./index.css";
import {
  cardTemplateSelectors,
  formSelectors,
  profileSelectors,
  buttonEditProfile,
  buttonAddPlace,
  apiOptions,
  buttonEditAvatar,
  buttonSubmitUserInfo,
  buttonSubmitAvatar,
  buttonSubmitCard,
} from "../utils/constants.js";
import { renderLoading } from "../utils/utils";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

let myUserInfo = {};

const userInfo = new UserInfo(
  profileSelectors.nameSelector,
  profileSelectors.descriptionSelector,
  profileSelectors.avatarSelector
);

const api = new Api(apiOptions);

Promise.all([api.getUserInfo(), api.getCards()]).then(
  ([serverUserInfo, cardsInfo]) => {
    myUserInfo = serverUserInfo;
    userInfo.setUserInfo(serverUserInfo);
    userInfo.setUserAvatar(serverUserInfo);
    cardList.renderItems(cardsInfo);
  }
);

const formsToValidate = {};

const formList = Array.from(
  document.querySelectorAll(formSelectors.formSelector)
);

formList.forEach((form) => {
  const formToValidate = new FormValidator(formSelectors, form);
  formToValidate.enableValidation();
  formsToValidate[form.id] = formToValidate;
});

const popupProfileForm = new PopupWithForm(formSelectors.profileFormSelector, {
  handleSubmitForm: (data) => {
    renderLoading(true, buttonSubmitUserInfo, "Сохранить");
    api
      .editUserInfo({
        name: data.name,
        about: data.about,
      })
      .then(() => {
        userInfo.setUserInfo(data);
        popupProfileForm.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitUserInfo, "Сохранить");
      });
  },
});

const popupDeleteCard = new PopupWithConfirmation(
  formSelectors.deleteFormSelector
);

const popupNewPlaceForm = new PopupWithForm(formSelectors.placeFormSelector, {
  handleSubmitForm: (dataSet) => {
    renderLoading(true, buttonSubmitCard, "Создать");
    api
      .addNewCard({
        name: dataSet.photoName,
        link: dataSet.photoSource,
      })
      .then((cardInfo) => {
        const newCard = createNewCard(cardInfo);
        cardList.addItem(newCard);
        popupNewPlaceForm.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitCard, "Создать");
      });
  },
});

const popupAvatarForm = new PopupWithForm(formSelectors.avatarFormSelector, {
  handleSubmitForm: (data) => {
    renderLoading(true, buttonSubmitAvatar, "Сохранить");
    api
      .editAvatar({
        avatar: data.avatarSource,
      })
      .then((newInfo) => {
        userInfo.setUserAvatar(newInfo);
        popupAvatarForm.closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, buttonSubmitAvatar, "Сохранить");
      });
  },
});

const showProfileForm = () => {
  const profileInfo = userInfo.getUserInfo();
  popupProfileForm.openPopup(formsToValidate);
  formsToValidate["editForm"].resetValidation();
  popupProfileForm.setInputValues(profileInfo);
};

const showAvatarForm = () => {
  popupAvatarForm.openPopup(formsToValidate);
  formsToValidate["editAvatarForm"].resetValidation();
};

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
  const newCard = new Card(
    {
      cardData: cardInfo,
      userID: myUserInfo._id,
      handleCardClick: () => {
        popupCard.openPopup(cardInfo.name, cardInfo.link);
      },
      handleLikeClick: () => {
        if (cardInfo.likes.find((like) => like._id === myUserInfo._id)) {
          api
            .removeLike(cardInfo._id)
            .then((data) => {
              newCard.updateLikes(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .addLike(cardInfo._id)
            .then((data) => {
              newCard.updateLikes(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      handleDeleteClick: () => {
        popupDeleteCard.openPopup();
        formsToValidate["deleteForm"].enableSubmitButton();
        popupDeleteCard.setSubmit(() => {
          api
            .deleteCard(cardInfo._id)
            .then(() => {
              newCard.removeCard();
              popupDeleteCard.closePopup();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
    },
    cardTemplateSelectors
  );
  return newCard.createCard();
};

const cardList = new Section(
  {
    renderer: (cards) => {
      const card = createNewCard(cards);
      cardList.addItem(card);
    },
  },
  cardTemplateSelectors.cardsContainer
);

popupCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupProfileForm.setEventListeners();
popupAvatarForm.setEventListeners();
popupNewPlaceForm.setEventListeners();
buttonEditProfile.addEventListener("click", showProfileForm);
buttonAddPlace.addEventListener("click", showNewPlaceForm);
buttonEditAvatar.addEventListener("click", showAvatarForm);
