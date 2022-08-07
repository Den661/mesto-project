import '../styles/index.css'
import {
  editAvatarForm, inputsEditAvatarForm,
  //popupBioInput,
  popupEditAvatar,
  //popupNameInput,
  profileAvatar,
  profileBio,
  profileName
} from '../utils/constants'
import {createPlaceElement} from "../components/cards";
import {
  profileEditButton,
  addPlaceForm,
  profileAddPlaceButton,
  //editProfileForm,
  popupAddPlace,
  //popupEditProfile,
  places,
  inputsAddCardForm,
  formAddCard,
  apiConfig,
validationConfig
} from "../utils/constants";
import  PopupWithForm from "../components/PopupWithForm";
import  FormValidator  from "../components/FormValidator";
const popupEditProfile = new PopupWithForm('.popup_type_profile-edit',submitEditProfileForm);
const profileEditValidation= enableFormValidation(popupEditProfile);

//import {enableValidation, resetFormCondition} from "../components/validation";
import {addPlace, //editProfile,
   getInitialCards, getUserInfo, updateAvatar} from "../Done/api";
import  Api from "../components/Api";
const api = new Api(apiConfig);
import {renderLoading} from "../utils/utils";
import {openPopup, closePopup, showEditAvatarButton, hideEditAvatarButton} from "../Done/popup";
export let userId

profileEditButton.addEventListener('mousedown', openEditFormHandler);

profileAddPlaceButton.addEventListener('mousedown', openAddPlaceHandler);

//editProfileForm.addEventListener('submit', submitEditProfileForm);

addPlaceForm.addEventListener('submit', submitAddCardForm);

profileAvatar.addEventListener('mousedown', openEditAvatarHandler)

editAvatarForm.addEventListener('submit', submitEditAvatarForm)

// popupCloseButton.forEach(button => {
//   //const popup = button.closest(".popup")
//   //button.addEventListener('mousedown',() => closePopup(popup))
// })

Promise.all([getInitialCards(), getUserInfo()])
  .then(([places, userData]) => {
    profileName.textContent = userData.name;
    profileBio.textContent = userData.about;
    profileAvatar.style.backgroundImage = `URL(${userData.avatar})`;
    userId = userData._id;
    places.forEach((place) => renderPlace(createPlaceElement(place)));
  })
  .catch(err => console.log(err))
/*
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error'
});
*/
function enableFormValidation(popupWithForm){
  const validation=new FormValidator(validationConfig, popupWithForm.getForm());
  validation.enableValidation();
  return validation;
}

function renderPlace(placeElement) {
  places.prepend(placeElement);
}

function openEditFormHandler() {
  profileEditValidation.resetFormCondition();
  popupEditProfile.open(profileName.textContent, profileBio.textContent);
}

function submitEditProfileForm(evt, inputValues) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button);
  api.editProfile(inputValues)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileBio.textContent = profileData.about;
    })
    .then(popupEditProfile.close())
    .catch(err => console.log(err))
    .finally(() => {renderLoading(false, button, "Создать")})
}

function openAddPlaceHandler() {
  const buttonElement = popupAddPlace.querySelector(".popup__button");
  formAddCard.reset();
  resetFormCondition(inputsAddCardForm, buttonElement);
  openPopup(popupAddPlace);
}

function openEditAvatarHandler() {
  const buttonElement = popupEditAvatar.querySelector(".popup__button");
  editAvatarForm.reset();
  resetFormCondition(inputsEditAvatarForm, buttonElement);
  hideEditAvatarButton();
  openPopup(popupEditAvatar);
}

/*
function submitEditProfileForm(evt) {
  evt.preventDefault();
  const button = evt.submitter;
  renderLoading(true, button)
  editProfile(popupNameInput.value, popupBioInput.value)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileBio.textContent = profileData.about;
    })
    .then(() => closePopup(evt.target.closest(".popup")))
    .catch(err => console.log(err))
    .finally(() => {renderLoading(false, button, "Создать")})
}*/

function submitAddCardForm(evt) {
  evt.preventDefault();
  const name = evt.target.querySelector(".popup__input_name").value;
  const link = evt.target.querySelector(".popup__input_link").value;
  const button = evt.submitter;
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
  const button = evt.submitter;
  renderLoading(true, button)
  updateAvatar(link)
    .then( data => {profileAvatar.style.backgroundImage = `URL(${data.avatar})`})
    .then(() => closePopup(evt.target.closest(".popup")))
    .catch(err => console.log(err))
    .finally(() => renderLoading(false, button, "Сохранить"))
}



profileAvatar.addEventListener('mouseover', showEditAvatarButton);
profileAvatar.addEventListener('mouseout', hideEditAvatarButton);

