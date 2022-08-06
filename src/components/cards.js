//import {openPopup} from "../Done/popup";
//import {imagePopupPic, imagePopupCaption, popupBigPicture, placeTemplate} from "../utils/constants";
import { placeTemplate} from "../utils/constants";
import  PopupWithImage from "./PopupWithImage";

import {userId} from "../pages";
import {addLike, deleteCard, deleteLike} from "../Done/api";

export {createPlaceElement};

const popupImg=new PopupWithImage('.popup_type_image');

function createPlaceElement(place) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const imageElement = placeElement.querySelector('.place__image');
  const deleteButton = placeElement.querySelector(".place__delete-button")
  imageElement.src = place.link;
  imageElement.alt = place.name;
  setLikes(place.likes, placeElement);
  setDeleteButtonState(deleteButton, place.owner._id)
  placeElement.querySelector('.place__like')
    .addEventListener('mousedown', (evt) => likeHandler(evt, place._id, placeElement));
  placeElement.querySelector('.place__delete-button')
    .addEventListener('mousedown', (evt) => deleteCardHandler(evt.target.parentElement, place._id));
 // imageElement.addEventListener('mousedown', (evt) => openImage(evt.target.src, place.name));
 imageElement.addEventListener('mousedown', (evt) => {
  popupImg.open(evt.target.src, place.name);
 });
  placeElement.querySelector('.place__title').textContent = place.name;

  return placeElement;
}

function removeElement(element) {
  element.remove();
}

// function openImage(src, caption) {
//   imagePopupPic.src = src;
//   imagePopupPic.alt = caption;
//   imagePopupCaption.textContent = caption;

//   openPopup(popupBigPicture);
// }

function setLikes(likes, card) {
  const likesCounter = card.querySelector(".place__likes-count");
  const likeButton = card.querySelector(".place__like");

  likesCounter.textContent = likes.length;
  if (checkUserLiked(likes)) {
    likeButton.classList.add("place__like_checked")
  } else likeButton.classList.remove("place__like_checked")
}

function setDeleteButtonState(deleteButton, ownerId) {
  if (ownerId === userId) {
    deleteButton.classList.add("place__delete-button_active")
  } else {
    deleteButton.classList.remove("place__delete-button_active")
  }
}

function checkUserLiked(likes) {
  return JSON.stringify(likes).includes(userId);
}

function deleteCardHandler(element, id) {
  deleteCard(id)
    .then(() => removeElement(element))
    .catch(err => console.log(err))
}

function likeHandler(evt, cardID, card) {
  if (evt.target.classList.contains("place__like_checked")) {
    deleteLike(cardID)
      .then(res => setLikes(res.likes, card))
      .catch(err => console.log(err))
  } else {
    addLike(cardID)
      .then(res => setLikes(res.likes, card))
      .catch(err => console.log(err))
  }
}
