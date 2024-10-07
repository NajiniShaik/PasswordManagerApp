import './index.css'

const Passwords = props => {
  const {websiteDetails, onDeleteObj} = props

  const {
    website,
    username,
    password,
    randomValue,
    isActive,
    id,
  } = websiteDetails

  const bgList = [
    'violet',
    'lightYellow',
    'darkGreen',
    'darkYellow',
    'lightGreen',
    'red',
  ]

  const getResult = () => {
    let result

    if (password) {
      result = (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          className="password-logo"
          alt="stars"
        />
      )
    }

    if (isActive && password) {
      result = <p className="password">{password}</p>
    }

    return result
  }

  const onClickDelete = () => {
    onDeleteObj(id)
  }

  return (
    <li className="card">
      <div className="password-detailed-card">
        <div className={`initial-card ${bgList[randomValue]}`}>
          <h1 className="initial">{username[0]}</h1>
        </div>

        <div>
          <p className="website-name">{website}</p>
          <p className="user-name">{username}</p>
          {getResult()}
        </div>
      </div>

      <button
        className="button"
        type="button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default Passwords
