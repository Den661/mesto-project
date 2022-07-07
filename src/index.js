import './styles/index.css'
import {initialCards} from './components/cardsData'
import {popupOpen, popupClose} from "./components/popup";
import {renderPlace, createPlaceElement} from "./components/cards";
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
} from "./components/commons";
import {enableValidation} from "./components/validation";
import {formSubmitHandler, newPlaceSubmitHandler, openEditForm} from "./components/commons";

profileEditButton.addEventListener('click', openEditForm);

profileAddPlaceButton.addEventListener('click', () => popupOpen(popupAddPlace));

popupEditProfileCloseButton.addEventListener('click', () => popupClose(popupEditProfile));

editProfileForm.addEventListener('submit', formSubmitHandler);

popupAddPlaceCloseButton.addEventListener('click', () => popupClose(popupAddPlace));

addPlaceForm.addEventListener('submit', newPlaceSubmitHandler);

popupBigPictureCloseButton.addEventListener('click', () => popupClose(popupBigPicture));

initialCards.forEach(card => renderPlace(createPlaceElement(card.name, card.link)));

enableValidation({formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error'});
