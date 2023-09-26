export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  };

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', () => this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', () => this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      openedPopup.closePopup()};
  }

  setEventListenersOnPopups() {
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') 
        || evt.target.classList.contains('popup__close')) {
          this.closePopup();
        }
      })
  }
}