import {Component} from 'react'
import './index.css'
import ThemeContext from '../../ThemeContext'

class NoVideosFound extends Component {
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
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
                className="failure-view-image"
              />
              <h1 style={{color: isDarkTheme ? 'white' : 'black'}}>
                No Search results found
              </h1>
              <p style={{color: isDarkTheme ? '#cccccc' : 'grey'}}>
                Try different key words or remove search filter
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

export default NoVideosFound
