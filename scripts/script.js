const popupEditProfile = document.querySelector('.popup_type_profile-edit');
const popupAddPlace = document.querySelector('.popup_type_place-add');
const popupBigPicture = document.querySelector('.popup_type_image');
const imagePopupPic = popupBigPicture.querySelector('.popup__image');
const imagePopupCaption = popupBigPicture.querySelector('.popup__figcaption');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileBio = profile.querySelector('.profile__bio');
const popupNameInput = popupEditProfile.querySelector(".popup__input_name");
const popupBioInput = popupEditProfile.querySelector(".popup__input_bio");
const places = document.querySelector('.places__list');
const profileEditButton = profile.querySelector('.profile__edit-button');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditProfileSubmitButton = popupEditProfile.querySelector('.popup__button');
const popupAddPlaceCloseButton = popupAddPlace.querySelector('.popup__close');
const profileAddPlaceButton = profile.querySelector('.profile__add-button');
const popupAddPlaceSubmitButton = popupAddPlace.querySelector('.popup__button');
const popupBigPictureCloseButton = popupBigPicture.querySelector('.popup__close');


profileEditButton.addEventListener('click', openEditForm);

profileAddPlaceButton.addEventListener('click', () => popupOpen(popupAddPlace));

popupEditProfileCloseButton.addEventListener('click', () => popupClose(popupEditProfile));

popupEditProfileSubmitButton.addEventListener('click', formSubmitHandler);

popupAddPlaceCloseButton.addEventListener('click', () => popupClose(popupAddPlace));

popupAddPlaceSubmitButton.addEventListener('click', newPlaceSubmitHandler);

popupBigPictureCloseButton.addEventListener('click', () => popupClose(popupBigPicture));

function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

function popupClose(popup) {
  popup.classList.remove('popup_opened')
}

function openEditForm() {
  popupNameInput.value = profileName.textContent;
  popupBioInput.value = profileBio.textContent

  popupOpen(popupEditProfile);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInput.value;
  profileBio.textContent = popupBioInput.value;

  popupClose(popupEditProfile);
}

function newPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const name = popupAddPlace.querySelector(".popup__input_name").value;
  const link = popupAddPlace.querySelector(".popup__input_link").value;
  const placeElement = createPlaceElement(name, link);

  renderPlace(placeElement);
  popupClose(popupAddPlace);
}

function likeToggle(like) {
  like.classList.toggle('place__like_checked');
}

function removeElement(element) {
  element.remove();
}

function openImage(src, caption) {
  imagePopupPic.src = src;
  imagePopupPic.alt = caption;
  imagePopupCaption.textContent = caption;

  popupOpen(popupBigPicture);
}

function renderPlace(placeElement) {
  places.prepend(placeElement);
}

function createPlaceElement(name, link) {
  const placeTemplate = document.querySelector("#place-template").content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  placeElement.querySelector('.place__like').addEventListener('click', (evt) => likeToggle(evt.target));

  placeElement.querySelector('.place__delete-button').addEventListener('click', (evt) => removeElement(evt.target.parentElement));

  placeElement.querySelector('.place__image').addEventListener('click', (evt) => openImage(evt.target.src, name));

  placeElement.querySelector('.place__image').src = link;
  placeElement.querySelector('.place__image').alt = name;
  placeElement.querySelector('.place__title').textContent = name;

  return placeElement;
}

initialCards.forEach(card => renderPlace(createPlaceElement(card.name, card.link)));
