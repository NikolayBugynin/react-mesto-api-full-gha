import React, { useContext } from "react";

import Card from "./Card";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onCardDelete,
  cards,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <button
            onClick={onEditAvatar}
            type="button"
            aria-label="Редактировать"
            className="profile__edit-avatar-button button">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
          </button>

          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                aria-label="Редактировать"
                className="profile__edit-button button"></button>
            </div>
            <p className="profile__specification">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            type="button"
            aria-label="Добавить"
            className="profile__add-button button"></button>
        </section>
        <section className="elements">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}></Card>
            );
          })}
        </section>
      </main>
    </div>
  );
}
