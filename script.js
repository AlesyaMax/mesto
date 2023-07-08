console.log('скрипт подключен');

const overlayForm = document.querySelector('.overlay');
const editButton = document.querySelector('.profile-info__button_edit');
const saveButton = overlayForm.querySelector('.form__button_save');
const closeButton = overlayForm.querySelector('.form__button_close');
const elements = document.querySelector('.elements');
const likeButton = elements.querySelectorAll('.elements__button_like');

const inputName = overlayForm.querySelector('.form__input_type_name');
const inputDescription = overlayForm.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile-info__name');
const profileDescription = document.querySelector('.profile-info__description');

const showForm = function() {
  overlayForm.classList.toggle('overlay_display_none');
  inputName.value = `${profileName.textContent}`;
  inputDescription.value = `${profileDescription.textContent}`
};

const closeForm = function() {
  overlayForm.classList.toggle('overlay_display_none')
};

const changeInfo = function() {
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