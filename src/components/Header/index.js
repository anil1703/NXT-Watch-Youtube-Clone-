import {Component} from 'react'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {NavBar, NavButton, ModalContainer} from './styledComponents'
import ThemeContext from '../../ThemeContext'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import './index.css'

class Header extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value
          const NavBgClr = isDarkTheme ? '#231f20' : '#ffffff'
          const ButtonClr = isDarkTheme ? '#ffffff' : '#3b82f6'
          const ModalBgClr = isDarkTheme ? '#424242' : '#cbd5e1'
          const ModalTextColor = isDarkTheme ? '#ffffff' : '#000000'

          const onChangeTheme = () => {
            changeTheme()
          }

          return (
            <NavBar color={NavBgClr}>
              <Link to="/">
                <img
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
              <ul className="navbar-ul">
                <li>
                  <button 
                  type="button"
                    data-testid="theme"
                    onClick={onChangeTheme}
                    className="themebtn"
                  >
                    {isDarkTheme ? (
                      <BsBrightnessHigh
                        style={{cursor: 'pointer'}}
                        size={25}
                        color={'#ffffff'}
                      />
                    ) : (
                      <BsMoon style={{cursor: 'pointer'}} size={25} />
                    )}
                  </button>
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="nav-profile"
                  />
                </li>
                <li>
                  <Popup
                    modal
                    trigger={
                      <NavButton color={ButtonClr} className="navBar-Logout">
                        Logout
                      </NavButton>
                    }
                  >
                    {close => (
                      <ModalContainer
                        bgColor={ModalBgClr}
                        color={ModalTextColor}
                      >
                        <p>Are you sure, you want to logout</p>
                        <div style={{display: 'flex'}}>
                          <button
                            type="button"
                            onClick={() => {
                              this.logout()
                              close()
                            }}
                            style={{
                              marginRight: '10px',
                              padding: '5px 10px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '7px',
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={close}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: 'transparent',
                              color: 'red',
                              border: '2px solid red',
                              borderRadius: '7px',
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </ModalContainer>
                    )}
                  </Popup>
                </li>
              </ul>
            </NavBar>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
