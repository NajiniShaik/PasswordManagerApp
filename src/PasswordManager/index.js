import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import Passwords from '../Passwords'

import './index.css'

class PasswordManager extends Component {
  state = {
    websitesList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onAddNewObj = event => {
    event.preventDefault()

    const {website, username, password} = this.state

    const newObj = {
      id: uuidv4(),
      website,
      username,
      password,
      randomValue: Math.floor(Math.random() * 6),
      isActive: false,
    }

    this.setState(prevState => ({
      websitesList: [...prevState.websitesList, newObj],
      website: '',
      username: '',
      password: '',
    }))
  }

  updateWebsite = event => {
    this.setState({website: event.target.value})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updateSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteObj = id => {
    const {websitesList} = this.state

    const filteredList = websitesList.filter(
      eachWebsite => eachWebsite.id !== id,
    )

    this.setState({websitesList: filteredList})
  }

  onUpdateStatus = () => {
    this.setState(prevState => ({
      websitesList: prevState.websitesList.map(eachItem => ({
        ...eachItem,
        isActive: !eachItem.isActive,
      })),
    }))
  }

  emptyContainerMsg = () => (
    <div className="result-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          className="img"
          alt="no passwords"
        />
        <p className="title">No Passwords</p>
      </div>
    </div>
  )

  passwordListFun = filteredList => (
    <ul className="passwords-list">
      {filteredList.map(eachObj => (
        <Passwords
          websiteDetails={eachObj}
          key={eachObj.id}
          onDeleteObj={this.onDeleteObj}
        />
      ))}
    </ul>
  )

  render() {
    const {websitesList, website, username, password, searchInput} = this.state

    const filteredList = websitesList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="money-manager-app">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            className="navbar-logo"
            alt="app logo"
          />
        </nav>

        <div className="cards-container">
          <div className="bg-container top-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
              alt="password manager"
              className="user-login-img1"
            />

            <form className="form-container" onSubmit={this.onAddNewObj}>
              <h1 className="title">Add New Password</h1>

              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-card-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-element"
                  value={website}
                  onChange={this.updateWebsite}
                />
              </div>

              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-card-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-element"
                  value={username}
                  onChange={this.updateUsername}
                />
              </div>

              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-card-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-element"
                  value={password}
                  onChange={this.updatePassword}
                />
              </div>

              <div className="btn-card">
                <button className="add-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="user-login-img2"
            />
          </div>

          <div className="bg-container">
            <div className="detailed-container">
              <h1 className="title">
                Your Passwords <p className="count">{filteredList.length}</p>
              </h1>

              <div className="input-card search-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="input-card-img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="input-element"
                  value={searchInput}
                  onChange={this.updateSearchInput}
                />
              </div>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onClick={this.onUpdateStatus}
              />
              <label htmlFor="checkbox" className="label-element">
                Show Passwords
              </label>
            </div>

            {filteredList.length === 0
              ? this.emptyContainerMsg()
              : this.passwordListFun(filteredList)}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
