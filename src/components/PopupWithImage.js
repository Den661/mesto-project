import  Popup from "./Popup";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popupimg=this._popup.querySelector('.popup__image');
 }


 open({src, caption}) {
 // const imagePopupPic =  super._popup.querySelector('.popup__image');
 this._popupimg.src = src;
 this._popupimg.alt = caption;
  //super._popup.querySelector('.popup__figcaption').textContent = caption;
  super.open();
 }

}
