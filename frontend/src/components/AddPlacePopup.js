import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: link,
    });
  }

  useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="popup-add"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        type="text"
        name="placename"
        className="popup__input popup__input_type_title"
        id="placename-input"
        placeholder="Введите название"
        minLength={2}
        maxLength={30}
        required
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <span className="popup__input-error placename-input-error"></span>
      <input
        type="url"
        name="placelink"
        className="popup__input popup__input_type_link"
        id="placelink-input"
        placeholder="Введите ссылку на картинку"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__input-error placelink-input-error"></span>
    </PopupWithForm>
  );
}
