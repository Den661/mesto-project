import {
  likesCounterSelector,
  likeSelector,
  deleteButtonSelector,
  placeImageSelector, placeTitleSelector, placeSelector
} from "../utils/constants";
import {userInfo} from "../pages/index";

export default class Card {
  constructor(templateSelector, {name, link, owner, likes, _id}, likeHandler, deleteHandler, clickHandler) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._ownerId = owner._id;
    this._likes = likes;
    this._id = _id;
    this._likeHandler = likeHandler;
    this._deleteHandler = deleteHandler;
    this._clickHandler = clickHandler;
  }

  _getCardTemplate() {
    return document.querySelector(this._templateSelector)
      .content.querySelector(placeSelector)
      .cloneNode(true);
  }

  generate() {
    const card = this._getCardTemplate();
    this._cardImage = card.querySelector(placeImageSelector);
    this._cardDeleteButton = card.querySelector(deleteButtonSelector);
    this._likeElement = card.querySelector(likeSelector);
    this._likesCounter = card.querySelector(likesCounterSelector);
    this._cardTitle = card.querySelector(placeTitleSelector)
    this._setDeleteButtonState(this._cardDeleteButton, this._ownerId);
    this.setLikes(this._likes);
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name

    return card;
  }

  setLikes(likes) {
    this._likes = likes;
    this._likesCounter.textContent = likes.length;
    if (this.checkUserLiked(likes)) {
      this._likeElement.classList.add("place__like_checked")
    } else this._likeElement.classList.remove("place__like_checked")
  }

  checkUserLiked(likes) {
    return JSON.stringify(likes).includes(userInfo.getUserInfo().id);
  }

  _setDeleteButtonState(deleteButton, ownerId) {
    if (ownerId === userInfo.getUserInfo().id) {
      deleteButton.classList.add("place__delete-button_active")
    } else {
      deleteButton.classList.remove("place__delete-button_active")
    }
  }

  _handleLike() {
    this._likeHandler()
  }

  _handleDelete(evt) {
    this._deleteHandler(evt);
  }

  _handleClick() {
    this._clickHandler();
  }

  _setEventListeners() {
    this._likeElement.addEventListener("click", () => {
      this._handleLike()
    })
    this._cardDeleteButton.addEventListener("click", (evt) => {
      this._handleDelete(evt)
    })
    this._cardImage.addEventListener("click", () => {
      this._handleClick()
    })
  }
}
