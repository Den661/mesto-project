
export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }

 open() {
    setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscapeClose);
    this._popup.removeEventListener('click', this.close);
  }

  setEventListeners() {
    document.addEventListener('keydown', (evt)=>{ this._handleEscapeClose(evt);});
    this._popup.querySelector('.popup__close').addEventListener('click',()=>{ this.close();});
    this._popup.addEventListener('click', (evt)=>{ if(evt.target.classList.contains(this._selector.slice(1)) ){ this.close();}});
  }

  _handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
