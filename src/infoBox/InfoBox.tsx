// Libs
import React from 'react'
import styled from 'styled-components'

// Components
import { default as Icon, Icons, IconColors } from '../icon/Icon'
import Colors from '../styles/colors.json'


// Props & State
interface Props {
  title: string
  text: string
}

interface State {
  isOpen: boolean
}

export default class InfoBox extends React.Component<Props, State> {
  state: State = {
    isOpen: false
  }

  UNSAFE_componentWillMount() {
    document.addEventListener('click', this.handleCloseInfoBox, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseInfoBox, false)
  }

  handleSwitchInfoBox = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))
  }

  handleCloseInfoBox = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { title, text } = this.props
    const { isOpen } = this.state

    return (
      <InfoBoxRoot onClick={this.handleSwitchInfoBox}>
        <Icon icon={isOpen ? Icons.InfoActive : Icons.Info} color={IconColors.Positive} />
        {isOpen && (
          <InfoBoxContainer>
            <InfoBoxTitle>
              {title}
            </InfoBoxTitle>
            <InfoBoxText>
              {text}
            </InfoBoxText>
          </InfoBoxContainer>
        )}
      </InfoBoxRoot>
    )
  }
}

// //
// Styles
// //
const InfoBoxRoot = styled.div`
  display: inline-block;
  position: relative;
`

const InfoBoxContainer = styled.div`
  z-index: 1;
  display: inline-flex;
  width: 350px;
  flex-direction: column;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0px 0px 4px -1px rgba(0,0,0,0.3);
  position: absolute;
  top: -15px;
  left: 30px;
`

const InfoBoxTitle = styled.div`
  display: flex;
  width: 100%;
  height: 45px;
  padding: 20px;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 18px;
  box-sizing: border-box;
  background: ${Colors.mermaid};
`

const InfoBoxText = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  color: ${Colors.normal_gray};
  box-sizing: border-box;
  background-color: white;
  line-height: 20px;
`