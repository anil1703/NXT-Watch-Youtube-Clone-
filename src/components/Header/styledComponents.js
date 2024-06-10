import styled from 'styled-components'

export const NavBar = styled.nav`
display:flex;
justify-Content:space-between;
height:65px;
width:100%;
padding:10px;
background-color: ${props => props.color};
align-items:center;
`
export const NavButton = styled.button`
color:#3b82f6;
border:2px solid ${props => props.color};
background-color:transparent;
color:${props => props.color};
border-radius:3px;
width:60px;
height:30px;
cursor:pointer;
`
export const ModalContainer = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  height:170px;
  width:300px;
  border-radius:7px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`
