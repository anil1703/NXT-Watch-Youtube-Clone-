import styled from 'styled-components'

export const HomeVideosUl = styled.ul`

display:flex;
flex-wrap:wrap;
gap:12px;
list-style:none;
margin-left:-38px;
overflow-y:scroll;
height:${props => props.minHeight};
`
