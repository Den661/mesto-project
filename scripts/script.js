const editPopup = document.querySelector('.popup_edit-profile');
const addPlacePopup = document.querySelector('.popup_add-place');
const imagePopup = document.querySelector('.popup_image');
const imagePopupPic = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__figcaption');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileBio = profile.querySelector('.profile__bio');
const popupNameInput = editPopup.querySelector(".popup__input[name = 'name']");
const popupBioInput = editPopup.querySelector(".popup__input[name = 'bio']");
const places = document.querySelector('.places__list');

profile.querySelector('.profile__edit-button').addEventListener('click', openEditForm);

editPopup.querySelector('.popup__close').addEventListener('click', function (){
  popupToggle(editPopup);
});

editPopup.querySelector('.popup__button').addEventListener('click', formSubmitHandler);

addPlacePopup.querySelector('.popup__close').addEventListener('click', function (){
  popupToggle(addPlacePopup);
});

profile.querySelector('.profile__add-button').addEventListener('click', function (){
  popupToggle(addPlacePopup);
});

addPlacePopup.querySelector('.popup__button').addEventListener('click', newPlaceSubmitHandler);

imagePopup.querySelector('.popup__close').addEventListener('click', function (){
  popupToggle(imagePopup);

});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

function openEditForm() {
  popupNameInput.value = profileName.textContent;
  popupBioInput.value = profileBio.textContent
  popupToggle(editPopup);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileBio.textContent = popupBioInput.value;
  popupToggle(editPopup);
}

function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = addPlacePopup.querySelector(".popup__input[name = 'name']").value;
  const link = addPlacePopup.querySelector(".popup__input[name = 'link']").value;

  addPlace(name, link);
  popupToggle(addPlacePopup);
}

function likeToggle(like) {
  like.classList.toggle('place__like_checked');
}

function removeElement(element) {
  element.remove();
}

function openImage (src, caption) {
  imagePopupPic.src = src;
  imagePopupPic.alt = caption;
  imagePopupCaption.textContent = caption;
  popupToggle(imagePopup);
}

function addPlace(name, link) {
  const placeTemplate = document.querySelector("#place-template").content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__like').addEventListener('click', function (evt) {
    likeToggle(evt.target);
  })
  placeElement.querySelector('.place__delete-button').addEventListener('click', function (evt) {
    removeElement(evt.target.parentElement)
  })
  placeElement.querySelector('.place__image').addEventListener('click', function (evt) {
    openImage(evt.target.src, evt.target.parentNode.querySelector('.place__title').textContent);
  })

  placeElement.querySelector('.place__image').src = link;
  placeElement.querySelector('.place__image').alt = name;
  placeElement.querySelector('.place__title').textContent = name;

  places.prepend(placeElement);
}

initialCards.forEach(card => addPlace(card.name, card.link));
