import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../ThemeContext'
import './index.css'
import {
  HomeMainContainer,
  HomeBoxContainer,
  LoadingDiv,
} from '../Home/styledComponents'
import {VideoCardChannel} from '../HomeCardLi/styledComponents'
import Header from '../Header'
import NavigationBar from '../NavigationBar'
import Cookies from 'js-cookie'
import FailureView from '../FailureView'
import ReactPlayer from 'react-player'
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

const changingToCamel = data => ({
  id: data.video_details.id,
  title: data.video_details.title,
  videoUrl: data.video_details.video_url,
  thumbnailUrl: data.video_details.thumbnail_url,
  channel: {
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
  },
  viewCount: data.video_details.view_count,
  publishedAt: data.video_details.published_at,
  description: data.video_details.description,
})

class VideoDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoData: {},
    like: false,
    dislike: false,
  }
  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
      const updatedData = changingToCamel(data)
      console.log(updatedData)
      this.setState({
        videoData: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {videoData} = this.state
    const {videoUrl} = videoData

    return <ReactPlayer url={videoUrl} height="70%" width="100%" controls />
  }

  retrying = () => {
    this.getVideoDetails()
  }

  renderFailureView = () => <FailureView retrying={this.retrying} />

  renderLoadingView = () => (
    <LoadingDiv>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="blue" height="50" width="50" />
      </div>
    </LoadingDiv>
  )

  renderVideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  liking = () => {
    this.setState({
      like: true,
      dislike: false,
    })
  }

  disLiking = () => {
    this.setState({
      like: false,
      dislike: true,
    })
  }

  render() {
    const {videoData, like, dislike} = this.state
    const {title, viewCount, publishedAt, channel, description} = videoData
    const {name, profileImageUrl, subscriberCount} = channel || {}

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, addVideo, savedVideos} = value
          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
          const color = isDarkTheme ? 'white' : 'black'

          const saving = () => {
            addVideo(videoData)
          }

          let isSaved

          const indexo = savedVideos.findIndex(
            eachVideo => eachVideo.id === videoData.id,
          )

          if (indexo === -1) {
            isSaved = false
          } else {
            isSaved = true
          }
          console.log('save')
          console.log(savedVideos)

          let likeButtonStyle
          if (isDarkTheme) {
            likeButtonStyle = like ? {color: '#64748b'} : {color: '#cccccc'}
          } else {
            likeButtonStyle = like ? {color: '#2563eb'} : {color: 'grey'}
          }

          let dislikeButtonStyle
          if (isDarkTheme) {
            dislikeButtonStyle = dislike
              ? {color: '#64748b'}
              : {color: '#cccccc'}
          } else {
            dislikeButtonStyle = dislike ? {color: '#2563eb'} : {color: 'grey'}
          }

          let saveButtonStyle
          if (isDarkTheme) {
            saveButtonStyle = isSaved ? {color: '#3b82f6'} : {color: '#cccccc'}
          } else {
            saveButtonStyle = isSaved ? {color: '#3b82f6'} : {color: 'grey'}
          }

          return (
            <>
              <Header />
              <HomeMainContainer>
                <NavigationBar />
                <HomeBoxContainer
                  data-testid="videoItemDetails"
                  bgColor={bgColor}
                  color={color}
                >
                  {this.renderVideoDetails()}
                  <div className="videoLowerPart">
                    <p style={{color: isDarkTheme ? 'white' : 'black'}}>
                      {title}
                    </p>
                    <div
                      style={{color: isDarkTheme ? '#cccccc' : 'grey'}}
                      className="VideoViewandLikes"
                    >
                      <div className="videoViewsDiv">
                        <p>{viewCount}</p>
                        <p>{publishedAt}</p>
                      </div>
                      <div className="videoLikesDiv">
                        <button
                          type="button"
                          onClick={this.liking}
                          style={likeButtonStyle}
                          className="VideoLikeButtonsStyle"
                        >
                          <AiOutlineLike size={20} />
                          <p>Like</p>
                        </button>
                        <button
                          onClick={this.disLiking}
                          style={dislikeButtonStyle}
                          className="VideoLikeButtonsStyle"
                        >
                          <AiOutlineDislike size={20} />
                          <p>Dislike</p>
                        </button>
                        <button
                          onClick={saving}
                          style={saveButtonStyle}
                          className="VideoLikeButtonsStyle"
                        >
                          <AiOutlinePlusSquare size={20} />
                          <p>{isSaved ? 'Saved' : 'Save'}</p>
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="videoChannelDiv">
                      <div>
                        <VideoCardChannel
                          style={{marginTop: '6px'}}
                          src={profileImageUrl}
                          data-testid="channel logo"
                        />
                      </div>

                      <div className="channelDetails">
                        <p style={{fontSize: '12px'}}>{name}</p>
                        <p
                          style={{
                            marginTop: '-10px',
                            fontSize: '11px',
                            color: isDarkTheme ? '#cccccc' : 'grey',
                          }}
                        >
                          {subscriberCount} subscribers
                        </p>
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                </HomeBoxContainer>
              </HomeMainContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoDetails
