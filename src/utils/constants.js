const popupEditProfile = document.querySelector('.popup_type_profile-edit');
export const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'f3af3a32-1630-4f2d-93bf-f554187b89c2',
    'Content-Type': 'application/json'
  }
};

export const validationConfig=
{
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error'
}
export const popupAddPlace = document.querySelector('.popup_type_place-add');
export const popupBigPicture = document.querySelector('.popup_type_image');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
//export const imagePopupPic = popupBigPicture.querySelector('.popup__image');
//export const imagePopupCaption = popupBigPicture.querySelector('.popup__figcaption');
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
export const editAvatarForm = popupEditAvatar.querySelector('.form');
export const popupBigPictureCloseButton = popupBigPicture.querySelector('.popup__close');
export const placeTemplate = document.querySelector("#place-template").content;
export const inputsAddCardForm = Array.from(popupAddPlace.querySelectorAll(".form__input"));
export const formAddCard = popupAddPlace.querySelector(".form");
export const profileAvatar = document.querySelector(".profile__avatar");
export const avatarEditButton = document.querySelector(".profile__avatar-overlay")
export const popupCloseButton = document.querySelectorAll(".popup__close")
export const inputsEditAvatarForm = Array.from(editAvatarForm.querySelectorAll(".form__input"));
