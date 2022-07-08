import {openPopup} from "./popup";
import {imagePopupPic, imagePopupCaption, popupBigPicture, placeTemplate} from "../utils/constants";

export {createPlaceElement};

function createPlaceElement(name, link) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const imageElement = placeElement.querySelector('.place__image');
  placeElement.querySelector('.place__like').addEventListener('click', (evt) => likeToggle(evt.target));
  placeElement.querySelector('.place__delete-button').addEventListener('click', (evt) => removeElement(evt.target.parentElement));
  imageElement.addEventListener('click', (evt) => openImage(evt.target.src, name));
  imageElement.src = link;
  imageElement.alt = name;
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

  openPopup(popupBigPicture);
}
