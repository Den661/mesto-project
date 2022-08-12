//#region imports
import '../styles/index.css';
import {
  profileAvatar,
  placeTemplate,
  userInfoConfig,
  profileEditButton,
  profileAddPlaceButton,
  apiConfig,
  validationConfig,
  profileFormName,
  profileFormBio
} from "../utils/constants";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card";
import Section from "../components/Section";
import Api from "../components/Api";
import PopupWithImage from "../components/PopupWithImage";
import {hideEditAvatarButton, showEditAvatarButton} from "../utils/utils";
//#endregion

//#region exports
export const userInfo = new UserInfo(userInfoConfig);
//#endregion

//#region constants
const popupEditProfile = new PopupWithForm('.popup_type_profile-edit', submitEditProfileForm);
const profileEditValidation = enableFormValidation(popupEditProfile);
const popupAddImg = new PopupWithForm('.popup_type_place-add', submitAddCardForm);
const addImgValidation = enableFormValidation(popupAddImg);
const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', submitEditAvatarForm);
const editAvatarValidation = enableFormValidation(popupEditAvatar);
const api = new Api(apiConfig);
const popupImg = new PopupWithImage('.popup_type_image');
const placesSection = new Section({
  items: [],
  renderer: (item) => {
    const place = createPlaceElement(item).generate();
    placesSection.appendElement(place)
  }
}, '.places__list');
//#endregion

//#region EventListeners
profileEditButton.addEventListener('mousedown', openEditFormHandler);
profileAddPlaceButton.addEventListener('mousedown', openAddPlaceHandler);
profileAvatar.addEventListener('mousedown', openEditAvatarHandler);
profileAvatar.addEventListener('mouseover', showEditAvatarButton);
profileAvatar.addEventListener('mouseout', hideEditAvatarButton);
//#endregion

//#region Functions
function createPlaceElement(place) {
  const card = new Card(placeTemplate, place,
    () => {
      if (card.checkUserLiked(card._likes)) {
        api.deleteLike(card._id)
          .then((data) => card.setLikes(data.likes))
          .catch(error => console.log(error))
      } else {
        api.addLike(card._id)
          .then((data) => card.setLikes(data.likes))
          .catch(error => console.log(error))
      }
    },
    (evt) => {
      api.deleteCard(card._id).then(() => evt.target.closest(".place").remove())
    },
    () => {
      popupImg.open(card._link, card._name)
    });
  return card;
}

function enableFormValidation(popupWithForm) {
  const validation = new FormValidator(validationConfig, popupWithForm.getForm());
  validation.enableValidation();
  return validation;
}

function openEditFormHandler() {
  profileEditValidation.resetFormCondition();
  const userInfoData = userInfo.getUserInfo();
  profileFormName.value = userInfoData.name;
  profileFormBio.value = userInfoData.about;
  popupEditProfile.open();
}

function openAddPlaceHandler() {
  addImgValidation.resetFormCondition();
  popupAddImg.open();
}

function openEditAvatarHandler() {
  editAvatarValidation.resetFormCondition();
  popupEditAvatar.open();
}

function submitEditProfileForm(evt, inputValues) {
  evt.preventDefault();
  popupEditProfile.renderLoading(true);
  api.editProfile(inputValues)
    .then((profileData) => {
      userInfo.setUserInfo(profileData);
    })
    .then(() => popupEditProfile.close())
    .catch(err => console.log(err))
    .finally(() => {
      popupEditProfile.renderLoading(false)
    });
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
    .finally(() => {
      popupAddImg.renderLoading(false, "Создать")
    })
}

function submitEditAvatarForm(evt, inputValues) {
  evt.preventDefault();
  popupEditAvatar.renderLoading(true)
  api.updateAvatar(inputValues)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .then(() => popupEditAvatar.close())
    .catch(err => console.log(err))
    .finally(() => popupEditAvatar.renderLoading(false, "Сохранить"))
}

//#endregion


Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([places, userData]) => {
    userInfo.setUserInfo(userData);
    placesSection.setItems(places);
    placesSection.renderItems()
  })
  .catch(err => console.log(err));






