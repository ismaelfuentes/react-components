// Libs
import React from 'react'
import styled from 'styled-components'

// Components
import Colors from '../../styles/colors.json'

export default function () {
  return <Container
    className="c-FiltersBar-DatePicker__pulse-icon"
    viewBox="0 0 50 50"
  >
    <circle cx="25" cy="25" r="25" />
    <circle cx="25" cy="25" r="25" />
    <circle cx="25" cy="25" r="25" />
    <circle cx="25" cy="25" r="25" />
  </Container>
}

// //
// Styles
// //
const Container = styled.svg`
  width: 8px;
  height: 8px;
  overflow: visible !important;

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
  
    50% {
      opacity: 0.4;
    }
  
    70% {
      opacity: 0.09;
    }
  
    100% {
      transform: scale(5);
      opacity: 0;
    }
  }

  circle {
    fill: ${Colors.mermaid};
  }

  circle:not(:last-of-type) {
    transform: scale(0.5);
    transform-origin: center center;
    animation: pulse 3s linear infinite;
  }

  circle:nth-of-type(2) {
    animation-delay: 1s;
  }

  circle:nth-of-type(3) {
    animation-delay: 2s;
  }
`