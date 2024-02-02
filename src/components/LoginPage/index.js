import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {IoEye, IoEyeOff} from 'react-icons/io5'
import {FaUserEdit} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      showPassword,
      showSubmitError,

      username,
      password,
      errorMsg,
    } = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const openPassword = showPassword ? (
      <IoEye size={16} />
    ) : (
      <IoEyeOff size={16} />
    )

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1706782982/vecteezy_film-roll-transparent_13532369_nbw7e6.png"
          alt=""
          className="login-image"
        />
        <form className="form-container" onSubmit={this.onClickSubmit}>
          <h1 className="login-title">Enter Your Login Details</h1>
          <label className="input-label" htmlFor="username">
            Username
          </label>
          <div className="input-field-container">
            <FaUserEdit size={22} />
            <input
              type="text"
              value={username}
              className="input-field"
              onChange={this.onChangeUsername}
              id="username"
              placeholder="Enter your Username"
            />
          </div>

          <label className="input-label" htmlFor="password">
            Password
          </label>
          <div className="input-field-container">
            <RiLockPasswordFill size={22} />
            <input
              type={passwordType}
              value={password}
              className="input-field"
              onChange={this.onChangePassword}
              id="password"
              placeholder="Enter your Password"
            />
            <button
              type="button"
              className="open-password-button"
              onClick={this.onClickShowPassword}
            >
              {openPassword}
            </button>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
