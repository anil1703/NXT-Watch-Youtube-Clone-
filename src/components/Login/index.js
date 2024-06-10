import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    msgError: '',
    isShow: false,
  }

  typingUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  typingPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  successfulLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  unSucessfulLogin = errorMsg => {
    this.setState({
      isError: true,
      msgError: errorMsg,
    })
  }

  logging = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.successfulLogin(data.jwt_token)
    } else {
      this.unSucessfulLogin(data.error_msg)
    }
  }

  changingMode = () => {
    this.setState(prevState => {
      return {isShow: !prevState.isShow}
    })
  }

  render() {
    const {isError, msgError, isShow} = this.state
    return (
      <div className="login-home">
        <div className="sub-login">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form onSubmit={this.logging}>
            <label htmlFor="username">USERNAME</label>
            <input
              onChange={this.typingUsername}
              id="username"
              type="text"
              placeholder="Username"
              className="login-input-style"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.typingPassword}
              id="password"
              placeholder="Password"
              type={isShow ? 'text' : 'password'}
              className="login-input-style"
            />
            <div id="showpsd">
              <input onChange={this.changingMode} type="checkbox" />
              <label htmlFor="showpsd">Show Password</label>
            </div>

            <button
              style={{color: '#ffffff'}}
              type="submit"
              className="login-button-style"
            >
              Login
            </button>
            {isError ? <p className="error">{msgError}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
