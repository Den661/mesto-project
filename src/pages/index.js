import '../styles/index.css'
import {
  profileAvatar,
  profileBio,
  profileName,
  placeTemplate, popupImg
} from '../utils/constants'
import {
  profileEditButton,
  profileAddPlaceButton,
  avatarEditButton,
  apiConfig,
validationConfig
} from "../utils/constants";
import  PopupWithForm from "../components/PopupWithForm";
import  FormValidator  from "../components/FormValidator";

const popupEditProfile = new PopupWithForm('.popup_type_profile-edit',submitEditProfileForm);
const profileEditValidation = enableFormValidation(popupEditProfile);
const popupAddImg = new PopupWithForm('.popup_type_place-add', submitAddCardForm);
const addImgValidation = enableFormValidation(popupAddImg);
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar',submitEditAvatarForm);
const editAvatarValidation = enableFormValidation(popupEditAvatar);

const placesSection = new Section({items:[],
  renderer:(item) => {
    const place = createPlaceElement(item).generate();
    placesSection.appendElement(place)
}},'.places__list')



import  Api from "../components/Api";
const api = new Api(apiConfig);
import Card from "../components/Card";
import Section from "../components/Section";

export let userId

profileEditButton.addEventListener('mousedown', openEditFormHandler);

profileAddPlaceButton.addEventListener('mousedown', openAddPlaceHandler);

profileAvatar.addEventListener('mousedown', openEditAvatarHandler)

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([places, userData]) => {
    profileName.textContent = userData.name;
    profileBio.textContent = userData.about;
    profileAvatar.style.backgroundImage = `URL(${userData.avatar})`;
    userId = userData._id;
    placesSection.setItems(places);
    placesSection.renderItems()
  })
  .catch(err => console.log(err))

function createPlaceElement(place){
  const card =  new Card(placeTemplate, place,
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
     (evt) => {
    api.deleteCard(card._id).
    then(() => evt.target.closest(".place").remove())
     },
     () => {
    popupImg.open(card._link, card._name)
     });
     return card;
    }
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

function openEditFormHandler() {
  profileEditValidation.resetFormCondition();
  const profileForm=popupEditProfile.getForm();
  profileForm.querySelector('.popup__input_name').value = profileName.textContent;
  profileForm.querySelector('.popup__input_bio').value =  profileBio.textContent;
  popupEditProfile.open();
}

function openAddPlaceHandler() {
  addImgValidation.resetFormCondition();
  popupAddImg.open();
}

function openEditAvatarHandler() {
  editAvatarValidation.resetFormCondition();
  hideEditAvatarButton();
  popupEditAvatar.open();
}

function submitEditProfileForm(evt, inputValues) {
  evt.preventDefault();
  popupEditProfile.renderLoading(true);
  api.editProfile(inputValues)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      profileBio.textContent = profileData.about;
    })
    .then(() => popupEditProfile.close())
    .catch(err => console.log(err))
    .finally(() => {popupEditProfile.renderLoading(false)});
}

function submitAddCardForm(evt, inputValues) {
  evt.preventDefault();
  popupAddImg.renderLoading(true);
  api.addPlace(inputValues)
    .then(place => {
      return createPlaceElement(place)
    })
    .then(placeElement => placesSection.prependElement(placeElement.generate()))
    .then(() => popupAddImg.close())
    .catch(err => console.log(err))
    .finally(() => {popupAddImg.renderLoading(false,  "Создать")})
}

function submitEditAvatarForm (evt, inputValues) {
  evt.preventDefault();
  popupEditAvatar.renderLoading(true)
  api.updateAvatar(inputValues)
    .then( data => {profileAvatar.style.backgroundImage = `URL(${data.avatar})`})
    .then(() => popupEditAvatar.close())
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.renderLoading(false, "Сохранить"))
}

function showEditAvatarButton () {
  avatarEditButton.style.visibility = 'visible';
  avatarEditButton.style.opacity = '1';
}

function hideEditAvatarButton () {
  avatarEditButton.style.visibility = 'hidden';
  avatarEditButton.style.opacity = 0;
}


profileAvatar.addEventListener('mouseover', showEditAvatarButton);
profileAvatar.addEventListener('mouseout', hideEditAvatarButton);

