import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = (evt) => {
      submitFunction(evt, this._getInputValues());
    };
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._submitBtnText = this._submitButton.textContent;
    this._inputList = Array.from(this._form.querySelectorAll('input'));
  }

  close() {
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

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitFunction);
  }

  _getInputValues() {
    return this._inputList.reduce((prevVal, item) => {
      prevVal[item.name] = item.value;
      return prevVal;
    }, {});
  }
}
