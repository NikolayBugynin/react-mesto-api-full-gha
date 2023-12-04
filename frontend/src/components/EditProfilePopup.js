import React, { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        className="popup__input popup__input_type_name"
        id="name-input"
        placeholder="Введите имя"
        minLength={2}
        maxLength={40}
        required
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        name="specification"
        className="popup__input popup__input_type_specification"
        id="specification-input"
        placeholder="Введите информацию о себе"
        minLength={2}
        maxLength={200}
        required
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="popup__input-error specification-input-error"></span>
    </PopupWithForm>
  );
}
