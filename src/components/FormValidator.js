export default class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass},formElement) {
    this._formElement=formElement;
    this._formSelector=formSelector;
    this._inputSelector=inputSelector;
    this._submitButtonSelector=submitButtonSelector;
    this._inactiveButtonClass=inactiveButtonClass;
    this._inputErrorClass=inputErrorClass;
    this._errorClass=errorClass;

  }

  enableValidation(){
    this._formElement.addEventListener('submit', function (evt) {evt.preventDefault();});
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> {
        this._checkInputValidity( inputElement);
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  }


  _checkInputValidity( inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError( inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled =false;
    }
  }

  _showInputError( inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

 _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  resetFormCondition () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement)
    inputList.forEach((input) => this._hideInputError(input))
  }

}
