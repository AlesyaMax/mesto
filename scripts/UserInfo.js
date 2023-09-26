export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo({userName, userDescription}) {
    return {userName, userDescription};
  }

  setUserInfo() {
    const userInfo = this.getUserInfo(data);
    this._nameElement.textContent = userInfo.userName;
    this._descriptionElement.textContent = userInfo.userDescription;
  }
}