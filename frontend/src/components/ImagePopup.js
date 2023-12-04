export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className="ImagePopup">
      <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
        <figure className="popup-picture__content">
          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-button button"
            onClick={onClose}></button>
          <img
            className="popup-picture__image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="popup-picture__caption">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
