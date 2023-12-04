import React, { useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

  const valueLink = useRef(null);

  useEffect(() => {
    valueLink.current.value = "";
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: valueLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_type_link"
        id="avatar-input"
        placeholder="Введите ссылку на картинку"
        required
        ref={valueLink}
      />
      <span className="popup__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
