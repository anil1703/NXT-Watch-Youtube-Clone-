import {Component} from 'react'
import ThemeContext from '../../ThemeContext'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import FailureView from '../FailureView'

import {FaFireAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {
  HomeMainContainer,
  HomeBoxContainer,
  LoadingDiv,
} from '../Home/styledComponents'
import {
  CatergoryTitlediv,
  CategoryLogoDiv,
  TredingVideoUl,
  TreVideoList,
  TrendListImg,
} from './styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class TrendingHome extends Component {
  state = {
    trendingList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        channel: eachItem.channel,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }))
      this.setState({
        trendingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <LoadingDiv>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="blue" height={50} width={50} />
      </div>
    </LoadingDiv>
  )

  retrying = () => {
    this.getTrendingVideos()
  }

  renderFailureView = () => <FailureView retrying={this.retrying} />

  renderSuccessView = isDarkTheme => {
    const {trendingList} = this.state
    return (
      <TredingVideoUl>
        {trendingList.map(eachTrend => (
          <Link className="linkStyle" to={`/videos/${eachTrend.id}`}>
            <TreVideoList
              style={{display: 'flex', gap: '10px', cursor: 'pointer'}}
              key={eachTrend.id}
            >
              <TrendListImg
                src={eachTrend.thumbnailUrl}
                alt="video thumbnail"
              />
              <div>
                <p style={{color: isDarkTheme ? 'white' : 'black'}}>
                  {eachTrend.title}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    marginTop: '-10px',
                    color: isDarkTheme ? '#cccccc' : 'grey',
                  }}
                >
                  {eachTrend.channel.name}
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
                  <p>{eachTrend.viewCount}</p>
                  <p>{eachTrend.publishedAt}</p>
                </div>
              </div>
            </TreVideoList>
          </Link>
        ))}
      </TredingVideoUl>
    )
  }

  renderApiStatus = isDarkTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView(isDarkTheme)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const color = isDarkTheme ? 'white' : 'black'
          const catbgColor = isDarkTheme ? '#181818' : '#ebebeb'
          const logoDivClr = isDarkTheme ? '#0f0f0f' : ' #f9f9f9'

          return (
            <>
              <Header />
              <HomeMainContainer>
                <NavigationBar />
                <HomeBoxContainer
                  data-testid="trending"
                  bgColor={bgColor}
                  color={color}
                >
                  <CatergoryTitlediv catbgColor={catbgColor}>
                    <CategoryLogoDiv logoDivClr={logoDivClr}>
                      <FaFireAlt color={'#ff0000'} size={30} />
                    </CategoryLogoDiv>
                    <h1>Trending</h1>
                  </CatergoryTitlediv>
                  {this.renderApiStatus(isDarkTheme)}
                </HomeBoxContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingHome
