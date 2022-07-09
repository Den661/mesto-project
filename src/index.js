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
  popupBigPicture,
  places,
  inputsAddCardForm,
  formAddCard
} from "./utils/constants";
import {enableValidation, resetFormCondition} from "./components/validation";

profileEditButton.addEventListener('click', openEditFormHandler);

profileAddPlaceButton.addEventListener('click', openAddPlaceHandler);

popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

editProfileForm.addEventListener('submit', submitEditProfileForm);

popupAddPlaceCloseButton.addEventListener('click', () => closePopup(popupAddPlace));

addPlaceForm.addEventListener('submit', submitAddCardForm);

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
  formAddCard.reset();
  resetFormCondition( inputsAddCardForm, buttonElement);
  openPopup(popupAddPlace);
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileBio.textContent = popupBioInput.value;
    closePopup(evt.target.closest(".popup"));
}

function submitAddCardForm(evt) {
    evt.preventDefault();
    const name = evt.target.querySelector(".popup__input_name").value;
    const link = evt.target.querySelector(".popup__input_link").value;
    const placeElement = createPlaceElement(name, link);

    renderPlace(placeElement);
    closePopup(evt.target.closest(".popup"));
    evt.target.reset();
}

