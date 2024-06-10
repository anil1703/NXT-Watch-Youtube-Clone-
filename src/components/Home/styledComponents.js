import styled from 'styled-components'

export const HomeBannerContainer = styled.div`
background-image:url(https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png);
height:300px;
background-size:cover;
display:flex;
padding:14px;
justify-content:space-between;
align-items:flex-start;
`

export const HomeMainContainer = styled.div`
display:flex;
background-color:white;
`
export const HomeBoxContainer = styled.div`
padding:30px;
background-color:${props => props.bgColor};
width:100%;
color:${props => props.color};
`
export const BannerButton = styled.button`
height:40px;
background-color:transparent;
color:black;
border 2px solid black;


`
export const SubBAnner = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;

gap:20px;
`
export const SearchContainer = styled.div`
width:500px;
display:flex;
margin-top:14px;
height:40px;
`
export const InputSearch = styled.input`
height:100%;
width:100%;
background-color: transparent;
border:1px solid #94a3b8;
color:${props => props.color};
outline:none;
padding-left:5px;

`
export const SearchButton = styled.button`
width:50px;
border:1px solid #94a3b8;
background-color: transparent;`

export const BannerDeleteBtn = styled.button`
border:none;
cursor:pointer;
background-color:transparent;
`
export const LoadingDiv = styled.div`
height:60%;
width:100%;
display:flex;
justify-content:center;
align-items:center;
`
export const HomeVideosContainer = styled.div`
overflow-y:auto;
`
