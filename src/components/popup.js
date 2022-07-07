export {popupOpen, popupClose}

import {toggleButtonState, hideInputError} from "./validation";

function popupOpen(popup) {
  const buttonElement = popup.querySelector(".popup__button");
  const inputList = Array.from(popup.querySelectorAll(".form__input"));
  const formElement = popup.querySelector(".form")
  if (formElement) {
    toggleButtonState(inputList, buttonElement, "popup__button_inactive")
    inputList.forEach((input) => hideInputError(formElement, input, "form__input_invalid", "form__input-error"))
  }
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClose);
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      popupClose(popup)
    }
  })
}

function popupClose(popup) {
  const formElement = popup.querySelector(".form")
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
  if (formElement) {
    form.reset();
  }
}

function escClose(evt) {
  if (evt.key === 'Escape') {
    popupClose(document.querySelector('.popup_opened'))
  }
}
