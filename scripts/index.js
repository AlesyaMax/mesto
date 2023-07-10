const popupForm = document.querySelector('.popup__edit');
const popupArea = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit');
const saveButton = popupForm.querySelector('.popup__save');
const closeButton = popupArea.querySelector('.popup__close');
const elements = document.querySelector('.elements');
const likeButton = elements.querySelectorAll('.elements__like');

const inputName = popupForm.querySelector('.popup__input_type_name');
const inputDescription = popupForm.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const showForm = function() {
  popupArea.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent
};

const closeForm = function() {
  popupArea.classList.remove('popup_opened')
};

const changeInfo = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeForm()
};

editButton.addEventListener('click', showForm);
closeButton.addEventListener('click', closeForm);
popupForm.addEventListener('submit', changeInfo);