import styled from 'styled-components'

export const CatergoryTitlediv = styled.div`
  height: 70px;
  background-color: ${props => props.catbgColor};
  margin-top:-30px;
  width:100%;
  display:flex;
align-items:center;
gap:20px;
padding-left:40px;
border-bottom-left-radius:8px;
border-bottom-right-radius:8px;
`
export const CategoryLogoDiv = styled.div`
height:60px;
width:60px;
border-radius:50%;
background-color:${props => props.logoDivClr};
display:flex;
justify-content:center;
align-items:center;
`
export const TredingVideoUl = styled.ul`
list-style:none;
display:flex;
flex-direction:column;
gap:20px;
margin-left:-37px;
height:76vh;
overflow-y:auto;

`
export const TreVideoList = styled.li``

export const TrendListImg = styled.img`
height:150px;
align-self:center;
`
export const TredingVideoUlGaming = styled.ul`
list-style:none;
display:flex;
flex-direction:row;
flex-wrap:wrap;
gap:20px;
margin-left:-37px;
height:76vh;
overflow-y:auto;
`
export const TreVideoListGaming = styled.li``
