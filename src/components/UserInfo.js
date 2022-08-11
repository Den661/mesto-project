export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  //принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
  setUserInfo({name, about}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
