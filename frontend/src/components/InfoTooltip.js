function InfoTooltip({ dataInfo, isOpen, onClose }) {
  return (
    <div className="InfoTooltip">
      <div
        className={`popup popup_infoTooltip ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__content">
          <button
            aria-label="Закрыть"
            className="popup__close-button"
            type="button"
            onClick={onClose}></button>
          <div className="popup__infoTool">
            {
              <img
                className="popup__img"
                src={dataInfo.src}
                alt={dataInfo.alt}
              />
            }
            <h2 className="popup__titleInfoTool">{dataInfo.text}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
