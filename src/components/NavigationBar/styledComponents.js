import styled from 'styled-components'

export const NavigationContainer = styled.div`
width:260px;
background-color:${props => props.bgColor};
color:${props => props.color};
height:92vh;
display:flex;
flex-direction:column;
justify-content:space-between;
`
export const NavigationUl = styled.ul`
list-style:none;
width:100%;
margin-left:-30px;
padding-top:20px;


`
export const List = styled.li`

cursor:pointer;
height:40px;
width:210px;

background-color:${props => props.bgColor};
border-top-left-radius:8px;
border-bottom-left-radius:8px;
`
export const NavigationImage = styled.img`
height:20px;
margin-right:13px;
`
export const NavigationFooter = styled.div`
padding-left:10px;
`
export const NavigationButton = styled.button`
background-color:transparent;
border:none;
display:flex;
align-items:center;
gap:10px;
width:100%;
cursor:pointer;
color:${props => props.color}

`
