import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    isPasswordHidden: true,
    searchInput: '',
  }

  onAddPassword = event => {
    event.preventDefault()

    const websiteNameEl = document.getElementById('websiteName')
    const userNameEl = document.getElementById('userName')
    const passwordEl = document.getElementById('password')

    const newPassword = {
      id: uuidv4(),
      websiteName: websiteNameEl.value,
      userName: userNameEl.value,
      password: passwordEl.value,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
    }))

    websiteNameEl.value = ''
    userNameEl.value = ''
    passwordEl.value = ''
  }

  onFilterPasswords = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleHidPassword = () => {
    this.setState(prevState => ({
      isPasswordHidden: !prevState.isPasswordHidden,
    }))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state

    const filteredPasswords = passwordsList.filter(
      passwordDetails => passwordDetails.id !== id,
    )

    this.setState({passwordsList: filteredPasswords})
  }

  render() {
    const {passwordsList, isPasswordHidden, searchInput} = this.state

    const filteredPasswordsList = passwordsList.filter(passwordDetails =>
      passwordDetails.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    const passwordsCount = filteredPasswordsList.length

    return (
      <div className="app-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="input-container">
          <img
            className="input-container-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <div className="input-form-container">
            <h1>Add New Password</h1>
            <form onSubmit={this.onAddPassword}>
              <div className="input-div">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <hr />
                <input
                  id="websiteName"
                  className="input"
                  type="text"
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-div">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <hr />
                <input
                  id="userName"
                  className="input"
                  type="text"
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-div">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <hr />
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="add-btn-container">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="output-container">
          <div className="count-search-container">
            <div className="display-count">
              <h1 className="passwords-count-text">Your Passwords</h1>
              <p className="passwords-count">{passwordsCount}</p>
            </div>
            <div className="search-input-container">
              <img
                className="search-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <hr />
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.onFilterPasswords}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              id="showPassword"
              type="checkbox"
              onChange={this.onToggleHidPassword}
              checked={!isPasswordHidden}
            />
            <label className="show-password-label" htmlFor="showPassword">
              Show Passwords
            </label>
          </div>
          <ul className="passwords-list">
            {filteredPasswordsList.length !== 0 ? (
              filteredPasswordsList.map(passwordDetails => (
                <PasswordItem
                  passwordDetails={passwordDetails}
                  isPasswordHidden={isPasswordHidden}
                  onDeletePassword={this.onDeletePassword}
                  key={passwordDetails.id}
                />
              ))
            ) : (
              <div>
                <img
                  className="no-passwords-img"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-password">No Passwords</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
