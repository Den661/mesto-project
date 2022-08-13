import Popup from "./Popup";
import {popupImageSelector} from "../utils/constants";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupPic = this._popup.querySelector(popupImageSelector);
    this._imageCaption = this._popup.querySelector('.popup__figcaption');
  }

  open(src, caption) {
    this._imagePopupPic.src = src;
    this._imagePopupPic.alt = caption;
    this._imageCaption.textContent = caption;
    super.open();
  }
}
