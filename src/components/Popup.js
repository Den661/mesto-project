import {popupClosedClass, popupOpenedClass} from "../utils/constants";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeByOverlay = (evt) => {
      this._handleClose(evt, popupOpenedClass);
    };
    this._closeByX = (evt) => {
      this._handleClose(evt, popupClosedClass);
    };
    this._closeByEscFunction = (evt) => {
      this._handleEscapeClose(evt);
    };
  }

  open() {
    this._popup.classList.add(popupOpenedClass);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(popupOpenedClass);
    this._removeEventListeners();
  }

  setEventListeners() {
    document.addEventListener('keydown', this._closeByEscFunction);
    this._popup.addEventListener('click', this._closeByOverlay);
    this._popup.addEventListener('click', this._closeByX);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._closeByEscFunction);
    this._popup.removeEventListener('click', this._closeByOverlay);
    this._popup.removeEventListener('click', this._closeByX);
  }

  _handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClose(evt, selector) {
    if (evt.target.classList.contains(selector)) {
      this.close();
    }
  }
}
