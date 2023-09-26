import { formSelectors } from './constants.js';

export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent
    };  
    return this._userInfo;
  }

  setUserInfo() {
    this._inputList = document.querySelector(`.${formSelectors.profileFormSelector}`).querySelectorAll(formSelectors.inputSelector);
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    this._nameElement.textContent = this._formValues.userName;
    this._descriptionElement.textContent = this._formValues.userDescription;
  }
}