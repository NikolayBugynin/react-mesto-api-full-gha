import CurrentUserContext from "../contexts/CurrentUserContext";

import { useContext } from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => onCardClick(card);

  const handleLikeClick = () => onCardLike(card);

  const handleDeleteClick = () => onCardDelete(card);

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_type_active "
  }`;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <article className="element">
        <div className="element__card">
          <img
            src={card.link}
            alt={card.name}
            onClick={handleCardClick}
            className="element__image"
          />
          {isOwn && (
            <button
              type="button"
              className="element__delete-button button"
              onClick={handleDeleteClick}
            />
          )}
        </div>
        <div className="element__subline">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__likescontainer">
            <button
              type="button"
              aria-label="Нравится"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}></button>
            <span className="element__like-score">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </CurrentUserContext.Provider>
  );
}
