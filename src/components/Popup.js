
export default class popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

 open() {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeClose);
    this._popup.removeEventListener('click', this.close);
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscapeClose);
    this._popup.querySelector('.popup__close').addEventListener('click', this.close)
    this._popup.addEventListener('click', this.close)
  }

  _handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'))
    }
  }

}
