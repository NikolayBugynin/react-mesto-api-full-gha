import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, onCardDelete, card }) {
  const handleCardDelete = (e) => {
    e.preventDefault();

    onCardDelete(card);
  };
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCardDelete}
      isValid={true}></PopupWithForm>
  );
}

export default ConfirmationPopup;
