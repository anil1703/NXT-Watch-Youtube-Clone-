import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import {MdDelete} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import ThemeContext from '../../ThemeContext'
import NavigationBar from '../NavigationBar'
import Loader from 'react-loader-spinner'
import HomeVideos from '../HomeVideos'
import FailureView from '../FailureView'
import NoVideosFound from '../NoVideosFound'

import './index.css'

import {
  HomeBannerContainer,
  HomeMainContainer,
  HomeBoxContainer,
  BannerButton,
  SubBAnner,
  SearchContainer,
  SearchButton,
  InputSearch,
  BannerDeleteBtn,
  LoadingDiv,
  HomeVideosContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    homeVideos: [],
    searchInput: '',
    isBannervisible: true,
    apiStatus: apiStatusConstants.initial,
  }

  

  componentDidMount() {
    this.getVideos()
  }

  searching = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  retrying = () => {
    this.setState(
      {
        searchInput: '',
      },
      this.getVideos,
    )
  }

  getVideos = async () => {
    const {searchInput} = this.state
    console.log(searchInput)
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        channel: eachItem.channel,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
      }))
      this.setState({
        homeVideos: updatedData,
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
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </LoadingDiv>
  )

  renderFailureView = () => <FailureView retrying={this.retrying} />
  renderSuccessView = () => {
    const {homeVideos} = this.state
    if (homeVideos.length === 0) {
      return <NoVideosFound retrying={this.retrying} />
    }

    return (
      <HomeVideosContainer>
        <HomeVideos homeVideos={homeVideos} />
      </HomeVideosContainer>
    )
  }

  renderapiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  getSearchResults = () => {
    this.getVideos()
  }

  render() {
    const { searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, isBannerOff, isBanner} = value

          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
          const color = isDarkTheme ? 'white' : 'black'

          const deletingBannerHome = () => {
            this.setState({
              isBannervisible: false,
            })
            isBannerOff()
          }

          return (
            <div className="main-home">
              <Header />
              <HomeMainContainer>
                <NavigationBar />
                <HomeBoxContainer
                  data-testid="home"
                  bgColor={bgColor}
                  color={color}
                >
                  {isBanner ? (
                    <HomeBannerContainer data-testid="banner">
                      <SubBAnner>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="header-logo"
                        />
                        <p style={{color: 'black'}}>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <BannerButton>GET IT NOW</BannerButton>
                      </SubBAnner>
                      <BannerDeleteBtn
                        data-testid="close"
                        onClick={deletingBannerHome}
                      >
                        <MdDelete size={20} />
                      </BannerDeleteBtn>
                    </HomeBannerContainer>
                  ) : null}
                  <SearchContainer>
                    <InputSearch
                      onChange={this.searching}
                      color={color}
                      value={searchInput}
                      type="search"
                      placeholder="Search"
                    />
                    <SearchButton
                      data-testid="searchButton"
                      onClick={this.getSearchResults}
                    >
                      <FaSearch
                        size={20}
                        color={`${isDarkTheme ? 'white' : 'black'}`}
                      />
                    </SearchButton>
                  </SearchContainer>
                  <>{this.renderapiStatus()}</>
                </HomeBoxContainer>
              </HomeMainContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
