import {Component} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../../ThemeContext'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import {FaCalendarPlus} from 'react-icons/fa'
import {
  HomeMainContainer,
  HomeBoxContainer,
  
} from '../Home/styledComponents'
import {
  CatergoryTitlediv,
  CategoryLogoDiv,
  TredingVideoUl,
  TreVideoList,
  TrendListImg,
} from '../TrendingHome/styledComponents'
import './index.css'

class SavedVideos extends Component {
  renderNoSavedVideosView = () => (
    <div className="no-videos-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-saved-style"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  renderSavedVideos = (isDarkTheme, savedVideos) => (
    <TredingVideoUl>
      {savedVideos.map(eachVideo => (
        <Link
          className="linkStyle"
          to={`/videos/${eachVideo.id}`}
          key={eachVideo.id}
        >
          <TreVideoList
            style={{display: 'flex', gap: '10px', cursor: 'pointer'}}
          >
            <TrendListImg src={eachVideo.thumbnailUrl} alt="video thumbnail" />
            <div>
              <p style={{color: isDarkTheme ? 'white' : 'black'}}>
                {eachVideo.title}
              </p>
              <p
                style={{
                  fontSize: '12px',
                  marginTop: '-10px',
                  color: isDarkTheme ? '#cccccc' : 'grey',
                }}
              >
                {eachVideo.channel.name}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: '-20px',
                  fontSize: '10px',
                  color: isDarkTheme ? '#cccccc' : 'grey',
                }}
              >
                <p>{eachVideo.viewCount}</p>
                <p>{eachVideo.publishedAt}</p>
              </div>
            </div>
          </TreVideoList>
        </Link>
      ))}
    </TredingVideoUl>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const color = isDarkTheme ? 'white' : 'black'
          const catbgColor = isDarkTheme ? '#181818' : '#ebebeb'
          const logoDivClr = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          return (
            <>
              <Header />
              <HomeMainContainer>
                <NavigationBar />
                <HomeBoxContainer
                  data-testid="savedVideos"
                  bgColor={bgColor}
                  color={color}
                >
                  <CatergoryTitlediv catbgColor={catbgColor}>
                    <CategoryLogoDiv logoDivClr={logoDivClr}>
                      <FaCalendarPlus color={'#ff0000'} size={30} />
                    </CategoryLogoDiv>
                    <h1>Saved Videos</h1>
                  </CatergoryTitlediv>
                  {savedVideos.length === 0
                    ? this.renderNoSavedVideosView()
                    : this.renderSavedVideos(isDarkTheme, savedVideos)}
                </HomeBoxContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
