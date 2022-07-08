export {openPopup, closePopup}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escClose);
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClose);
}

function escClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}
