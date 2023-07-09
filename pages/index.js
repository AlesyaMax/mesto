console.log('скрипт подключен');

const popupForm = document.querySelector('.popup');
const editButton = document.querySelector('.profile-info__button_edit');
const saveButton = popupForm.querySelector('.container__button_save');
const closeButton = popupForm.querySelector('.container__button_close');
const elements = document.querySelector('.elements');
const likeButton = elements.querySelectorAll('.elements__button_like');

const inputName = popupForm.querySelector('.container__input_type_name');
const inputDescription = popupForm.querySelector('.container__input_type_description');
const profileName = document.querySelector('.profile-info__name');
const profileDescription = document.querySelector('.profile-info__description');

const showForm = function() {
  popupForm.classList.toggle('popup_display_opened');
  inputName.value = `${profileName.textContent}`;
  inputDescription.value = `${profileDescription.textContent}`
};

const closeForm = function() {
  popupForm.classList.toggle('popup_display_opened')
};

const changeInfo = function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeForm()
};

editButton.addEventListener('click', showForm);
closeButton.addEventListener('click', closeForm);
saveButton.addEventListener('click', changeInfo);

elements.addEventListener('click', function(event) {
  let count = likeButton.length;
  for (i=0; i < count; i++) {
    if (event.target == likeButton[i]) {
      likeButton[i].classList.toggle('elements__button_like_active')}
  }
});