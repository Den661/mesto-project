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
export const placeTemplate = document.querySelector("#place-template").content;
export const inputsAddCardForm = Array.from(popupAddPlace.querySelectorAll(".form__input"));
export const formAddCard = popupAddPlace.querySelector(".form")



export const initialCards = [
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
