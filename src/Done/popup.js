/*
import {avatarEditButton} from "../utils/constants";

export {openPopup, closePopup, showEditAvatarButton, hideEditAvatarButton}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', closePopupByOverlayClick);
}

function closePopupByOverlayClick(evt){
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', closePopupByOverlayClick);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}
*/

function showEditAvatarButton () {
  avatarEditButton.style.visibility = 'visible';
  avatarEditButton.style.opacity = '1';
}

function hideEditAvatarButton () {
  avatarEditButton.style.visibility = 'hidden';
  avatarEditButton.style.opacity = 0;
}
