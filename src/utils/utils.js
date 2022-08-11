import {avatarEditButton} from "./constants";

export function renderLoading(isLoading, button, text){
  if (isLoading){
    button.textContent = "Сохранение..."
  }else {
    button.textContent = text;
  }
}

export function showEditAvatarButton () {
  avatarEditButton.style.visibility = 'visible';
  avatarEditButton.style.opacity = '1';
}

export function hideEditAvatarButton () {
  avatarEditButton.style.visibility = 'hidden';
  avatarEditButton.style.opacity = '0';
}
