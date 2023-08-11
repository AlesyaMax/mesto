const popupForm = document.querySelector('.popup__edit');
const popupArea = document.querySelector('.popup_edit-profile');
const editButton = document.querySelector('.profile__edit');
const saveProfileButton = popupForm.querySelector('.popup__save');
const closeProfileButton = popupArea.querySelector('.popup__close');
const elements = document.querySelector('.elements');

const inputName = popupForm.querySelector('.popup__input_type_name');
const inputDescription = popupForm.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_source');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupNew = document.querySelector('.popup_add-place');
const addButton = document.querySelector('.profile__add');
const closeNewButton = popupNew.querySelector('.popup__close');

//Работа с формами
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
  inputPlace.value = inputPlace.ariaPlaceholder;
  inputLink.value = inputLink.ariaPlaceholder;
  popupNew.classList.remove('popup_opened')
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
closeNewButton.addEventListener('click', closeNewPlaceForm);


//Работа с карточками
const initialCards = [
  {
    name: 'Трейлер',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/33b2ce28-f3f7-4a94-a5aa-fdb38e4a4842_600.jpg'
  },
  {
    name: 'У картин есть глаза',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/6d97c3a7-77a7-4261-b55f-655143aa042c_600.jpg'
  },
  {
    name: 'Подмосковье',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/ccf12522-357d-494e-bc21-bd3825347bce_600.jpg'
  },
  {
    name: 'Межгалактическое путешествие',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/24677ea2-69c6-4bff-afa5-ed8e1b5e3c10_600.jpg'
  },
  {
    name: 'Сирена',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/4b2135c3-b0e2-4eb8-ab64-ae5fd8f0d357_600.jpg'
  },
  {
    name: 'Слесарь без головы',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/d8766ee0-663c-4fb0-ad93-facd38876c51_600.jpg'
  },
  {
    name: 'Мастер и мастерица',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/607babd4-9f9b-4dc6-baae-cc42fd4aa188_600.jpg'
  },
  {
    name: 'Самогон Яблочкина',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/8b594b98-fd56-4259-9c40-c8429c6529c2_600.jpg'
  },
  {
    name: 'Джин',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/42e1ddde-147f-4eea-ad2d-5bd5eb387088_600.jpg'
  },
    {
    name: 'Амур',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/25ffd7ff-cdd1-4811-8985-1cfafd895cac_600.jpg'
  },
  {
    name: 'В Ад и обратно',
    link: 'https://mavecloud.s3mts.ru/storage/podcasts/27c24380-6b67-4f17-9109-78c33728cdcc/images/d82c34e5-136a-4310-8501-23fa65d2c6f6_600.jpg'
  }
];

const template = document.querySelector('.card-template').content;

const deleteCard = (e) => {
  const el = e.target.closest('.card');
  el.remove();
};

const likePhoto = (e) => {
  const el = e.target.closest('.elements__like');
  el.classList.toggle('elements__like_active')
};

const popPhoto = (e) => {
e.target.closest('.card').querySelector('.popup-photo').classList.toggle('popup-photo_opened')
};

const createCards = initialCards.forEach(function (element) {
    const card = template.cloneNode(true);
    const photoCloseBtn = card.querySelector('.popup-photo__close');
    const photo = card.querySelector('.elements__photo');
    card.querySelector('.elements__text').textContent = element.name;
    card.querySelector('.elements__photo').src = element.link;
    card.querySelector('.elements__photo').alt = element.name;
    const deleteButton = card.querySelector('.elements__delete');
    const likeButton = card.querySelector('.elements__like');
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likePhoto);
    photo.addEventListener('click', popPhoto);
    photoCloseBtn.addEventListener('click', popPhoto);
    card.querySelector('.popup-photo__photo').src = element.link;
    card.querySelector('.popup-photo__photo').alt = element.name;
    card.querySelector('.popup-photo__caption').textContent = element.name;
    elements.prepend(card) 
  });

const overlay = document.querySelector('.overlay');

const addNewCards = (evt) => {
    evt.preventDefault();
    const card = template.cloneNode(true);
    const photoCloseBtn = card.querySelector('.popup-photo__close');
    const photo = card.querySelector('.elements__photo');
    const deleteButton = card.querySelector('.elements__delete');
    const likeButton = card.querySelector('.elements__like');
    card.querySelector('.elements__text').textContent = inputPlace.value;
    photo.src = inputLink.value;
    photo.alt = inputPlace.value;
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likePhoto);
    photo.addEventListener('click', popPhoto);
    photoCloseBtn.addEventListener('click', popPhoto);
    card.querySelector('.popup-photo__photo').src = inputLink.value;
    card.querySelector('.popup-photo__photo').alt = inputPlace.value;
    card.querySelector('.popup-photo__caption').textContent = inputPlace.value;
    elements.prepend(card);
    closeNewPlaceForm()
};

const createForm = document.querySelector('.popup__add');
createForm.addEventListener('submit', addNewCards);




