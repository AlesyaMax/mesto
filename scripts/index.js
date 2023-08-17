const popupProfileForm = document.querySelector(".popup__edit");
const popupProfile = document.querySelector(".popup_edit-profile");
const editButton = document.querySelector(".profile__edit");
const saveProfileButton = popupProfileForm.querySelector(".popup__save");
const closeProfileButton = popupProfile.querySelector(".popup__close");
const cardsContainer = document.querySelector(".elements");

const inputName = popupProfileForm.querySelector(".popup__input_type_name");
const inputDescription = popupProfileForm.querySelector(
  ".popup__input_type_description"
);
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_source");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const popupNew = document.querySelector(".popup_add-place");
const addButton = document.querySelector(".profile__add");
const closeNewButton = popupNew.querySelector(".popup__close");
const popupNewPlaceForm = popupNew.querySelector(".popup__add");

const popupCard = document.querySelector(".popup_card");
const popupPhoto = popupCard.querySelector(".popup__photo");
const popupPhotoCaption = popupCard.querySelector(".popup__caption");
const popupCardCloseButton = popupCard.querySelector(".popup__close");

const template = document
  .querySelector(".card-template")
  .content.querySelector(".elements__item");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

const showProfileForm = function () {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
};

const showNewPlaceForm = function () {
  inputPlace.value = inputPlace.ariaPlaceholder;
  inputLink.value = inputLink.ariaPlaceholder;
  openPopup(popupNew);
};

const handleSubmitProfileForm = function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupProfile);
};

const handleDeleteClick = (e) => {
  const el = e.target.closest(".elements__item");
  el.remove();
};

const handleLikeClick = (e) => {
  const el = e.target.closest(".elements__like");
  el.classList.toggle("elements__like_active");
};

const handleClickPhoto = (e) => {
  e.target
    .closest(".card")
    .querySelector(".popup-photo")
    .classList.toggle("popup-photo_opened");
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
};

const handleSubmitNewPlaceForm = (evt) => {
  evt.preventDefault();
  createNewCards();
  closePopup(popupNew);
};

editButton.addEventListener("click", showProfileForm);
closeProfileButton.addEventListener("click", () => closePopup(popupProfile));
popupProfileForm.addEventListener("submit", handleSubmitProfileForm);
addButton.addEventListener("click", showNewPlaceForm);
closeNewButton.addEventListener("click", () => closePopup(popupNew));
popupNewPlaceForm.addEventListener("submit", handleSubmitNewPlaceForm);
popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));
