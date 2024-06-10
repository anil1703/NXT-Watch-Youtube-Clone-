import ThemeContext from '../../ThemeContext'
import {HomeVideosUl} from './styledComponents'
import HomeCardLi from '../HomeCardLi'

const HomeVideos = props => {
  const {homeVideos} = props
  return (
    <ThemeContext.Consumer>
      {value => {
        const { isBanner} = value
        console.log(isBanner)
        const minHeight = isBanner ? '300px' : '74.5vh'
        console.log(minHeight)
        return (
          <HomeVideosUl minHeight={minHeight}>
            {homeVideos.map(eachVideo => (
              <HomeCardLi key={eachVideo.id} cardDetails={eachVideo} />
            ))}
          </HomeVideosUl>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default HomeVideos
