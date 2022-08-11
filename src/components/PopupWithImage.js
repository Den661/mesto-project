import  Popup from "./Popup";
import {popupImageSelector} from "../utils/constants";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
 }


 open(src, caption) {
  const imagePopupPic =  this._popup.querySelector(popupImageSelector);
  imagePopupPic.src = src;
  imagePopupPic.alt = caption;
  this._popup.querySelector('.popup__figcaption').textContent = caption;
  super.open();
 }
}
