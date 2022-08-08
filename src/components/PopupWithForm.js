
import  Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction=(evt)=>{submitFunction( evt,this._getInputValues());};
    this._form=this._popup.querySelector('.form');
 }

 close()
 {
  super.close();
  this._form.reset();
 }

 setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', this._submitFunction);
 }

getForm() {
  return this._form;
}

renderLoading(isLoading, text="Сохранить"){
  const button =this._form.querySelector('.popup__button');
  if (isLoading){
    button.textContent = "Сохранение...";
  }else {
    button.textContent = text;
  }
}

_removeEventListeners() {
  super._removeEventListeners();
  this._form.removeEventListener('submit', this._submitFunction);
}

_getInputValues(){
  const inputList = Array.from(this._form.querySelectorAll('input'));

  return inputList.reduce((prevVal, item)=>{prevVal[item.name]=item.value; return prevVal;},{});
}



}
