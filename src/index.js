import './styles/index.css'
import {initialCards, popupBioInput, popupNameInput, profileBio, profileName} from './utils/constants'
import {openPopup, closePopup} from "./components/popup";
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
  popupBigPicture, places,
} from "./utils/constants";
import {enableValidation, hideInputError, toggleButtonState} from "./components/validation";

profileEditButton.addEventListener('click', openEditFormHandler);

profileAddPlaceButton.addEventListener('click', openAddPlaceHandler);

popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

editProfileForm.addEventListener('submit', formSubmitHandler);

popupAddPlaceCloseButton.addEventListener('click', () => closePopup(popupAddPlace));

addPlaceForm.addEventListener('submit', submitAddPlaceFormHandler);

popupBigPictureCloseButton.addEventListener('click', () => closePopup(popupBigPicture));

initialCards.forEach(card => renderPlace(createPlaceElement(card.name, card.link)));

enableValidation({formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error'});

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
  const inputList = Array.from(popupAddPlace.querySelectorAll(".form__input"));
  const formElement = popupAddPlace.querySelector(".form")
  formElement.reset();
  if (formElement) {
    toggleButtonState(inputList, buttonElement, "popup__button_inactive")
    inputList.forEach((input) => hideInputError(formElement, input, "form__input_invalid", "form__input-error"))
  }
  openPopup(popupAddPlace);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileBio.textContent = popupBioInput.value;
    closePopup(evt.target.closest(".popup"));
}

function submitAddPlaceFormHandler(evt) {
    evt.preventDefault();
    const name = evt.target.querySelector(".popup__input_name").value;
    const link = evt.target.querySelector(".popup__input_link").value;
    const placeElement = createPlaceElement(name, link);

    renderPlace(placeElement);
    closePopup(evt.target.closest(".popup"));
    evt.target.reset();
}

