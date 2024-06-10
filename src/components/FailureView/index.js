import {Component} from 'react'
import './index.css'
import ThemeContext from '../../ThemeContext'

class FailureView extends Component {
  clickingRetry = () => {
    const {retrying} = this.props
    retrying()
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div className="failure-view-container">
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
                alt="failure view"
                className="failure-view-image"
              />
              <h1 style={{color: isDarkTheme ? 'white' : 'black'}}>
                Oops! Something Went Wrong
              </h1>
              <p style={{color: isDarkTheme ? '#cccccc' : 'grey'}}>
                We are having some trouble to complete your request. Please try
                again.
              </p>

              <button type="button" onClick={this.clickingRetry} className="retryBtn">
                Retry
              </button>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default FailureView
