export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {
      userName: this._nameElement.textContent,
      userDescription: this._descriptionElement.textContent
    };  
    return this._userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.userName;
    this._descriptionElement.textContent = data.userDescription;
  }
}