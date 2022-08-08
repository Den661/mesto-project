
import  Popup from "./Popup";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction=submitFunction;
    this._form=this._popup.querySelector('.form');
 }

 open(name, about) {
  this._form.querySelector('.popup__input_name').value = name;
  this._form.querySelector('.popup__input_bio').value = about;
  super.open();
 }

 close()
 {
  super.close();
  this._form.reset();
 }

 setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (evt)=>{this._submitFunction( evt,this._getInputValues());});
 }

getForm() {
  return this._form;
}

_getInputValues(){
  const inputList = Array.from(this._form.querySelectorAll('input'));

  return inputList.reduce((prevVal, item)=>{prevVal[item.name]=item.value; return prevVal;},{});
}

_renderLoading(isLoading, button, text){
  if (isLoading){
    button.textContent = "Сохранение...";
  }else {
    button.textContent = text;
  }
}

}
