import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import ThemeContext from './ThemeContext'
import CheckingToken from './CheckingToken'
import Login from './components/Login'
import Home from './components/Home'
import VideoDetails from './components/VideoDetails'
import TrendingHome from './components/TrendingHome'
import GamingHome from './components/GamingHome'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkTheme: false,
      isBanner: true,
      savedVideos: [],
      activeCategory: 'home',
    }
  }

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  isBannerOff = () => {
    this.setState({isBanner: false})
  }

  addVideo = videoData => {
    this.setState(prevState => {
      const videoExists = prevState.savedVideos.some(
        video => video.id === videoData.id,
      )
      const updatedSavedVideos = videoExists
        ? prevState.savedVideos.filter(video => video.id !== videoData.id)
        : [...prevState.savedVideos, videoData]

      return {
        savedVideos: updatedSavedVideos,
      }
    })
  }

  changeCategory = category => {
    this.setState({
      activeCategory: category,
    })
  }

  render() {
    const {isDarkTheme, isBanner, savedVideos, activeCategory} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme: isDarkTheme,
          changeTheme: this.changeTheme,
          isBanner: isBanner,
          isBannerOff: this.isBannerOff,
          addVideo: this.addVideo,
          savedVideos: savedVideos,
          activeCategory: activeCategory,
          changeCategory: this.changeCategory,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <CheckingToken exact path="/" component={Home} />
          <CheckingToken exact path="/videos/:id" component={VideoDetails} />
          <CheckingToken exact path="/trending" component={TrendingHome} />
          <CheckingToken exact path="/gaming" component={GamingHome} />
          <CheckingToken exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
