import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isPasswordHidden, onDeletePassword} = props
  const {id, websiteName, userName, password} = passwordDetails

  const onDeleteBtn = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item-container">
      <div className="password-container">
        <div className="site-initial">G</div>
        <div>
          <p className="site-name">{websiteName}</p>
          <p className="user-name">{userName}</p>
          {isPasswordHidden ? (
            <img
              className="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          ) : (
            <p className="password">{password}</p>
          )}
        </div>
      </div>
      <button
        className="delete-btn"
        type="button"
        testid="delete"
        onClick={onDeleteBtn}
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
