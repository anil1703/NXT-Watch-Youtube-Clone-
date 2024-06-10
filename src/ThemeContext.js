import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  isBanner: true,
  isBannerOff: () => {},
  addVideo: () => {},
  savedVideos: [],
  activeCategory: 'home',
  changeCategory: () => {},
})

export default ThemeContext
