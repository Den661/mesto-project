export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      id: this._id
    };
  }

  //принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
  setUserInfo({name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.style.backgroundImage = `URL(${avatar})`;
    this._id =_id;
  }
}
