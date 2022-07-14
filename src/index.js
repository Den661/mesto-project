import './styles/index.css'
import {
  editAvatarForm,
  popupBioInput,
  popupEditAvatar,
  popupNameInput,
  profileAvatar,
  profileBio,
  profileName
} from './utils/constants'
import {openPopup, closePopup, showEditAvatarButton, hideEditAvatarButton} from "./components/popup";
import {createPlaceElement} from "./components/cards";
import {
  profileEditButton,
  addPlaceForm,
  popupBigPictureCloseButton,
  profileAddPlaceButton,
  popupEditProfileCloseButton,
  editProfileForm,
  popupAddPlaceCloseButton,
  popupAddPlace,
  popupEditProfile,
  popupBigPicture,
  places,
  inputsAddCardForm,
  formAddCard
} from "./utils/constants";
import {enableValidation, resetFormCondition} from "./components/validation";
import {addPlace, editProfile, getInitialCards, getUserInfo, updateAvatar} from "./components/api";
import {renderLoading} from "./utils/utils";
export let userId

profileEditButton.addEventListener('click', openEditFormHandler);

profileAddPlaceButton.addEventListener('click', openAddPlaceHandler);

popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

editProfileForm.addEventListener('submit', submitEditProfileForm);

popupAddPlaceCloseButton.addEventListener('click', () => closePopup(popupAddPlace));

addPlaceForm.addEventListener('submit', submitAddCardForm);

popupBigPictureCloseButton.addEventListener('click', () => closePopup(popupBigPicture));

profileAvatar.addEventListener('click', openEditAvatarHandler)

editAvatarForm.addEventListener('submit', submitEditAvatarForm)

Promise.all([getInitialCards(), getUserInfo()])
  .then(([places, userData]) => {
    profileName.textContent = userData.name;
    profileBio.textContent = userData.about;
    profileAvatar.style.backgroundImage = `URL(${userData.avatar})`;
    userId = userData._id;
    places.forEach((place) => renderPlace(createPlaceElement(place)));
  })

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error'
});

function renderPlace(placeElement) {
  places.prepend(placeElement);
}

function openEditFormHandler() {
  popupNameInput.value = profileName.textContent;
  popupBioInput.value = profileBio.textContent
  openPopup(popupEditProfile);
}

function openAddPlaceHandler() {
  const buttonElement = popupAddPlace.querySelector(".popup__button");
  formAddCard.reset();
  resetFormCondition(inputsAddCardForm, buttonElement);
  openPopup(popupAddPlace);
}

function openEditAvatarHandler() {
  openPopup(popupEditAvatar)
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector(".popup__button")
  renderLoading(true, button)
  editProfile(popupNameInput.value, popupBioInput.value)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileBio.textContent = profileData.about;
    })
    .then(() => closePopup(evt.target.closest(".popup")))
    .catch(err => console.log(err))
    .finally(() => {renderLoading(false, button, "Создать")})
}

function submitAddCardForm(evt) {
  evt.preventDefault();
  const name = evt.target.querySelector(".popup__input_name").value;
  const link = evt.target.querySelector(".popup__input_link").value;
  const button = evt.target.querySelector(".popup__button");
  renderLoading(true, button)
  addPlace(name, link)
    .then(place => {
      return createPlaceElement(place)
    })
    .then(placeElement => renderPlace(placeElement))
    .then(() => closePopup(evt.target.closest(".popup")))
    .then(() => evt.target.reset())
    .catch(err => console.log(err))
    .finally(() => {renderLoading(false, button, "Создать")})
}

function submitEditAvatarForm (evt) {
  evt.preventDefault();
  const link = evt.target.querySelector(".popup__input_link").value;
  const button = evt.target.querySelector(".popup__button");
  renderLoading(true, button)
  updateAvatar(link)
    .then( data => {profileAvatar.style.backgroundImage = `URL(${data.avatar})`})
    .then(() => closePopup(evt.target.closest(".popup")))
    .finally(() => renderLoading(false, button, "Сохранить"))
}



profileAvatar.addEventListener('mouseover', showEditAvatarButton);
profileAvatar.addEventListener('mouseout', hideEditAvatarButton);

