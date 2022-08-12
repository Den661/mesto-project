export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'f3af3a32-1630-4f2d-93bf-f554187b89c2',
    'Content-Type': 'application/json'
  }
};

export const validationConfig =
  {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'form__input_invalid',
    errorClass: 'form__input-error'
  }

export const userInfoConfig =
  {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__bio',
    avatarSelector: '.profile__avatar'
  }

export const profile = document.querySelector('.profile');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const profileAddPlaceButton = profile.querySelector('.profile__add-button');
export const placeTemplate = "#place-template";
export const profileAvatar = document.querySelector(".profile__avatar");
export const avatarEditButton = document.querySelector(".profile__avatar-overlay")
export const popupOpenedClass = "popup_opened";
export const popupClosedClass = "popup__close";
export const deleteButtonSelector = ".place__delete-button";
export const likesCounterSelector = ".place__likes-count";
export const placeImageSelector = ".place__image";
export const likeSelector = ".place__like";
export const placeTitleSelector = ".place__title";
export const placeSelector = ".place";
export const popupImageSelector = ".popup__image";

