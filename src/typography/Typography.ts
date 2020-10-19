// Libs
import styled from 'styled-components'

// Styles
import colors from '../styles/colors.json'

export const HeadLine = styled.span`
  color: ${colors.dark_gray};
  font-weight: bold;
  font-size: 20px;
`

export const Text = styled.span`
  color: ${colors.dark_gray};
  font-weight: normal;
  font-size: 14px;
`

export const ErrorText = styled.span`
  color: ${colors.critical_red};
`
