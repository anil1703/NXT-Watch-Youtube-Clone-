import ThemeContext from '../../ThemeContext'
import {Link} from 'react-router-dom'
import {
  VideoCardList,
  VideoCardThumbnail,
  VideoCardContentDiv,
  VideoCardChannel,
} from './styledComponents'

const HomeCardLi = props => {
  const {cardDetails} = props
  const {
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    name,
    profileImageUrl,
  } = cardDetails
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <Link className="linkStyle" to={`/videos/${id}`}>
            <VideoCardList>
              <VideoCardThumbnail src={thumbnailUrl} alt="video thumbnail" />
              <VideoCardContentDiv>
                <VideoCardChannel src={profileImageUrl} alt="channel logo" />
                <div>
                  <p
                    style={{
                      color: isDarkTheme ? 'white' : 'black',
                      fontSize: '12px',
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      color: isDarkTheme ? '#616e7c' : '#94a3b8',
                      fontSize: '12px',
                      marginTop: '-10px',
                    }}
                  >
                    {name}
                  </p>
                  <div
                    style={{display: 'flex', marginTop: '-20px', gap: '10px'}}
                  >
                    <p
                      style={{
                        color: isDarkTheme ? '#616e7c' : '#94a3b8',
                        fontSize: '12px',
                      }}
                    >
                      {viewCount} Views
                    </p>

                    <p
                      style={{
                        color: isDarkTheme ? '#616e7c' : '#94a3b8',
                        fontSize: '12px',
                      }}
                    >
                      {publishedAt}
                    </p>
                  </div>
                </div>
              </VideoCardContentDiv>
            </VideoCardList>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default HomeCardLi
