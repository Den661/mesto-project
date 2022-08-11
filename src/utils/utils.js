import {avatarEditButton} from "./constants";

export function showEditAvatarButton() {
  avatarEditButton.style.visibility = 'visible';
  avatarEditButton.style.opacity = '1';
}

export function hideEditAvatarButton() {
  avatarEditButton.style.visibility = 'hidden';
  avatarEditButton.style.opacity = '0';
}
