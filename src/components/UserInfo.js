export default class UserInfo {
  constructor(nameSelector, descriptionSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
    return this._userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
