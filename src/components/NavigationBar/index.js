import {Component} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../../ThemeContext'
import {
  NavigationContainer,
  NavigationUl,
  List,
  NavigationFooter,
  NavigationImage,
  NavigationButton,
} from './styledComponents'
import {FaHome, FaFireAlt, FaCalendarPlus} from 'react-icons/fa'
import {GiLoveHowl} from 'react-icons/gi'

class NavigationBar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, activeCategory, changeCategory} = value
          const bgColor = isDarkTheme ? '#231f20' : 'white'
          const color = isDarkTheme ? 'white' : 'black'
          const activeBgColor = isDarkTheme ? '#424242' : '#cbd5e1'
          const inactiveColor = isDarkTheme ? 'grey' : 'black'

          return (
            <NavigationContainer bgColor={bgColor} color={color}>
              <NavigationUl>
                <Link className="linkStyle" to="/">
                  <List
                    bgColor={activeCategory === 'home' ? activeBgColor : null}
                  >
                    <NavigationButton
                      color={color}
                      onClick={() => changeCategory('home')}
                    >
                      <FaHome
                        color={
                          activeCategory === 'home' ? '#ff0000' : inactiveColor
                        }
                        size={20}
                      />
                      <p>Home</p>
                    </NavigationButton>
                  </List>
                </Link>
                <Link className="linkStyle" to="/trending">
                  <List
                    bgColor={
                      activeCategory === 'trending' ? activeBgColor : null
                    }
                  >
                    <NavigationButton
                      color={color}
                      onClick={() => changeCategory('trending')}
                    >
                      <FaFireAlt
                        color={
                          activeCategory === 'trending'
                            ? '#ff0000'
                            : inactiveColor
                        }
                        size={20}
                      />
                      <p>Trending</p>
                    </NavigationButton>
                  </List>
                </Link>
                <Link className="linkStyle" to="/gaming">
                  <List
                    bgColor={activeCategory === 'gaming' ? activeBgColor : null}
                  >
                    <NavigationButton
                      color={color}
                      onClick={() => changeCategory('gaming')}
                    >
                      <GiLoveHowl
                        color={
                          activeCategory === 'gaming'
                            ? '#ff0000'
                            : inactiveColor
                        }
                        size={20}
                      />
                      <p>Gaming</p>
                    </NavigationButton>
                  </List>
                </Link>
                <Link className="linkStyle" to="/saved-videos">
                  <List
                    bgColor={activeCategory === 'saved' ? activeBgColor : null}
                  >
                    <NavigationButton
                      color={color}
                      onClick={() => changeCategory('saved')}
                    >
                      <FaCalendarPlus
                        color={
                          activeCategory === 'saved' ? '#ff0000' : inactiveColor
                        }
                        size={20}
                      />
                      <p>Saved Videos</p>
                    </NavigationButton>
                  </List>
                </Link>
              </NavigationUl>
              <NavigationFooter>
                <p>CONTACT US</p>
                <div>
                  <NavigationImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
                    alt="facebook logo"
                  />
                  <NavigationImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <NavigationImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
                    alt="linked in logo"
                  />
                </div>
                <p>Enjoy! Now to see your channels and recommendations!</p>
              </NavigationFooter>
            </NavigationContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NavigationBar
