// Libs
import React from 'react'
import styled from 'styled-components'

// Components
import Colors from '../../styles/colors.json'

export default function() {
  return <Container>+ Añadir</Container>
}

// //
// Styles
// //
const Container = styled.div`
  display: flex;
  width: 53px;
  height: 20px;
  background: ${Colors.blue_twitter};
  text-align: center;
  color: white;
  font-size: 12px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
`