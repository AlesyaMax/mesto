const popupForm = document.querySelector('.popup__edit');
const popupArea = document.querySelector('.popup_edit-profile');
const editButton = document.querySelector('.profile__edit');
const saveProfileButton = popupForm.querySelector('.popup__save');
const closeProfileButton = popupArea.querySelector('.popup__close');
const elements = document.querySelector('.elements');
const likeButton = elements.querySelectorAll('.elements__like');

const inputName = popupForm.querySelector('.popup__input_type_name');
const inputDescription = popupForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupNew = document.querySelector('.popup_add-place');
const addButton = document.querySelector('.profile__add');
const closeNewButton = popupNew.querySelector('.popup__close');

const showForm = function() {
  popupArea.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent
};

const closeForm = function() {
  popupArea.classList.remove('popup_opened')
};

const showNewPlaceForm = function() {
  popupNew.classList.add('popup_opened')
};

const closeNewPlaceForm = function() {
  popupNew.classList.remove('popup_opened');
};

const changeInfo = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeForm()
};

editButton.addEventListener('click', showForm);
closeProfileButton.addEventListener('click', closeForm);
popupForm.addEventListener('submit', changeInfo);
addButton.addEventListener('click', showNewPlaceForm);
addButton.addEventListener('click',showNewPlaceForm);
closeNewButton.addEventListener('click', closeNewPlaceForm);


