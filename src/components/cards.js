import {popupOpen} from "./popup";
import {imagePopupPic, imagePopupCaption, popupBigPicture, places} from "./commons";

export {createPlaceElement, renderPlace};

function createPlaceElement(name, link) {
  const placeTemplate = document.querySelector("#place-template").content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  placeElement.querySelector('.place__like').addEventListener('click', (evt) => likeToggle(evt.target));
  placeElement.querySelector('.place__delete-button').addEventListener('click', (evt) => removeElement(evt.target.parentElement));
  placeElement.querySelector('.place__image').addEventListener('click', (evt) => openImage(evt.target.src, name));
  placeElement.querySelector('.place__image').src = link;
  placeElement.querySelector('.place__image').alt = name;
  placeElement.querySelector('.place__title').textContent = name;

  return placeElement;
}

function likeToggle(like) {
  like.classList.toggle('place__like_checked');
}

function removeElement(element) {
  element.remove();
}

function openImage(src, caption) {
  imagePopupPic.src = src;
  imagePopupPic.alt = caption;
  imagePopupCaption.textContent = caption;

  popupOpen(popupBigPicture);
}

function renderPlace(placeElement) {
  places.prepend(placeElement);
}
