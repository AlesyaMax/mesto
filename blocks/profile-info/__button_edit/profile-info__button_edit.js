let editButton = document.querySelector('.profile-info__button_edit');
let saveButton = document.querySelector('.profile-info__button_save');
let closeButton = document.querySelector('.form__button_close');
let likeButton = document.querySelector('.elements__button_like');

let overlayForm = document.querySelector('.overlay');
let nameInfo = document.querySelector('.form__input_type_name');
let description = document.querySelector('.form__input_type_description');
let profileName = document.querySelector('.profile-info__name');
let profileDescription = document.querySelector('.profile-info__description');

function showForm() {
  overlayForm.classList.remove('overlay_display_none');
  overlayForm.classList.add('overlay_display_visible');
  nameInfo.value = `${profileName.textContent}`;
  description.value = `${profileDescription.textContent}`
};

function exitForm() {
  evt.preventDefault()
  overlayForm.classList.remove('overlay_display_visible');
  overlayForm.classList.add('overlay_display_none')
};


function changeInfo() {
  evt.preventDefault()
  profileName.textContent = `${nameInfo}`;
  profileDescription.textContent = `${description}`;

  exitForm()
};

editButton.addEventListener('click', function () { showForm() });

saveButton.addEventListener('click', function () { changeInfo() });

function like () {
  likeButton.style ('background-color: black')
};

likeButton.addEventListener('click', function () {like()});



