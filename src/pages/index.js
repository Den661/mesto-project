import '../styles/index.css'
import {
  editAvatarForm, inputsEditAvatarForm,
  popupBioInput,
  popupEditAvatar,
  popupNameInput,
  profileAvatar,
  profileBio,
  profileName,
  placeTemplate, config, popupImg
} from '../utils/constants'
import {showEditAvatarButton, hideEditAvatarButton} from "../Done/popup";
//import {createPlaceElement} from "../components/cards";
import {
  profileEditButton,
  addPlaceForm,
  profileAddPlaceButton,
  editProfileForm,
  popupAddPlace,
  popupEditProfile,
  places,
  inputsAddCardForm,
  formAddCard
} from "../utils/constants";
import {enableValidation, resetFormCondition} from "../components/validation";
import {addPlace, editProfile, getInitialCards, getUserInfo, updateAvatar} from "../Done/api";
import {renderLoading} from "../utils/utils";
import Card from "../components/Card";
import Api from "../components/Api";
export let userId

profileEditButton.addEventListener('mousedown', openEditFormHandler);

profileAddPlaceButton.addEventListener('mousedown', openAddPlaceHandler);

editProfileForm.addEventListener('submit', submitEditProfileForm);

addPlaceForm.addEventListener('submit', submitAddCardForm);

profileAvatar.addEventListener('mousedown', openEditAvatarHandler)

editAvatarForm.addEventListener('submit', submitEditAvatarForm)

// popupCloseButton.forEach(button => {
//   //const popup = button.closest(".popup")
//   //button.addEventListener('mousedown',() => closePopup(popup))
// })

const api  = new Api(config);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([places, userData]) => {
    profileName.textContent = userData.name;
    profileBio.textContent = userData.about;
    profileAvatar.style.backgroundImage = `URL(${userData.avatar})`;
    userId = userData._id;
    places.forEach((place) => {const card =  new Card(placeTemplate, place,
      () => {
      if(card.checkUserLiked(card._likes)){
        api.deleteLike(card._id)
          .then((data) => card.setLikes(data.likes))
          .catch(error => console.log(error))
      } else {
        api.addLike(card._id)
          .then((data) => card.setLikes(data.likes))
          .catch(error => console.log(error))
      }},
       () => {
      api.deleteCard(card._id)
        .then()
       },
       () => {
      popupImg.open(card._link, card._name)
       });
      renderPlace(card.generate())});
  })
  .catch(err => console.log(err))

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
  const buttonElement = popupEditAvatar.querySelector(".popup__button");
  editAvatarForm.reset();
  resetFormCondition(inputsEditAvatarForm, buttonElement);
  hideEditAvatarButton();
  openPopup(popupEditAvatar);
}

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
}

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

