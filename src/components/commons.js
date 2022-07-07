import {popupClose, popupOpen} from "./popup";
import {createPlaceElement, renderPlace} from "./cards";
import {hasInvalidInput} from "./validation";

export {openEditForm, formSubmitHandler, newPlaceSubmitHandler}

export const popupEditProfile = document.querySelector('.popup_type_profile-edit');
export const popupAddPlace = document.querySelector('.popup_type_place-add');
export const popupBigPicture = document.querySelector('.popup_type_image');
export const imagePopupPic = popupBigPicture.querySelector('.popup__image');
export const imagePopupCaption = popupBigPicture.querySelector('.popup__figcaption');
export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileBio = profile.querySelector('.profile__bio');
export const popupNameInput = popupEditProfile.querySelector(".popup__input_name");
export const popupBioInput = popupEditProfile.querySelector(".popup__input_bio");
export const places = document.querySelector('.places__list');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
export const editProfileForm = popupEditProfile.querySelector('.form');
export const popupAddPlaceCloseButton = popupAddPlace.querySelector('.popup__close');
export const profileAddPlaceButton = profile.querySelector('.profile__add-button');
export const addPlaceForm = popupAddPlace.querySelector('.form');
export const popupBigPictureCloseButton = popupBigPicture.querySelector('.popup__close');

function openEditForm() {
  popupNameInput.value = profileName.textContent;
  popupBioInput.value = profileBio.textContent
  popupOpen(popupEditProfile);
}

function formSubmitHandler(evt) {
  if (!hasInvalidInput(Array.from(evt.target.querySelectorAll(".form__input")))) {
    evt.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileBio.textContent = popupBioInput.value;
    popupClose(evt.target.closest(".popup"));
  }
}

function newPlaceSubmitHandler(evt) {
  if (!hasInvalidInput(Array.from(evt.target.querySelectorAll(".form__input")))) {
    evt.preventDefault();
    const name = evt.target.querySelector(".popup__input_name").value;
    const link = evt.target.querySelector(".popup__input_link").value;
    const placeElement = createPlaceElement(name, link);

    renderPlace(placeElement);
    popupClose(evt.target.closest(".popup"));
    evt.target.reset();
  }
}
