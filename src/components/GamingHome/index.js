import {Component} from 'react'
import {Link} from 'react-router-dom'
import ThemeContext from '../../ThemeContext'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import FailureView from '../FailureView'
import {GiLoveHowl} from 'react-icons/gi'
import {
  HomeMainContainer,
  HomeBoxContainer,
  LoadingDiv,
} from '../Home/styledComponents'
import {
  CatergoryTitlediv,
  CategoryLogoDiv,
  TredingVideoUlGaming,
  TreVideoListGaming,
  TrendListImg,
} from '../TrendingHome/styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class GamingHome extends Component {
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
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)

    if (response.ok) {
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
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
      <TredingVideoUlGaming>
        {trendingList.map(eachTrend => (
          <Link
            className="linkStyle"
            to={`/videos/${eachTrend.id}`}
            key={eachTrend.id}
          >
            <TreVideoListGaming style={{cursor: 'pointer'}}>
              <TrendListImg
                src={eachTrend.thumbnailUrl}
                alt="video thumbnail"
              />
              <div>
                <p style={{color: isDarkTheme ? 'white' : 'black'}}>
                  {eachTrend.title}
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
                  <p>{eachTrend.viewCount} Watching Worldwide</p>
                </div>
              </div>
            </TreVideoListGaming>
          </Link>
        ))}
      </TredingVideoUlGaming>
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
          const bgColor = isDarkTheme ? '#212121' : '#f9f9f9'
          const color = isDarkTheme ? 'white' : 'black'
          const catbgColor = isDarkTheme ? '#181818' : '#ebebeb'
          const logoDivClr = isDarkTheme ? '#0f0f0f' : ' #f9f9f9'

          return (
            <>
              <Header />
              <HomeMainContainer>
                <NavigationBar />
                <HomeBoxContainer bgColor={bgColor} color={color}>
                  <CatergoryTitlediv catbgColor={catbgColor}>
                    <CategoryLogoDiv logoDivClr={logoDivClr}>
                      <GiLoveHowl color={'#ff0000'} size={30} />
                    </CategoryLogoDiv>
                    <h1>Gaming</h1>
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

export default GamingHome
