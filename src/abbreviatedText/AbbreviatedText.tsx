// Libs
import * as React from 'react'
import styled from 'styled-components'

// Components
import { Text } from '../typography/Typography'
import Colors from '../styles/colors.json'

// State and props
interface Props {
  // Kind of title we want to show
  text?: string
}

interface State {
  isOverflowed: boolean
  isHover: boolean
}

// //
// Component
// //
class AbbreviatedText extends React.PureComponent<Props, State> {
  textElement: React.RefObject<any>

  constructor(props: Props) {
    super(props)
    this.state = {
      isOverflowed: false,
      isHover: false,
    }
    this.textElement = React.createRef()
  }

  componentDidMount() {
    const isOverflowed =
      this.textElement.current.scrollWidth >
      this.textElement.current.clientWidth

    this.setState({
      isOverflowed,
    })
  }

  handleHover(isHover: boolean) {
    this.setState({
      isHover,
    })
  }

  render() {
    return (
      <Container>
        <TextContainer ref={this.textElement}>
          {this.props.children}
          {this.state.isOverflowed && (
            <HoverRect
              onMouseEnter={() => this.handleHover(true)}
              onMouseLeave={() => this.handleHover(false)}
            />
          )}
        </TextContainer>
        {this.state.isHover && (
          <Tooltip>
            <Text>{this.props.children}</Text>
          </Tooltip>
        )}
      </Container>
    )
  }
}

export default AbbreviatedText

// //
// Styles
// //

const Container = styled.div`
  position: relative;
  width: 100%;
`

const TextContainer = styled.div`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const HoverRect = styled.div`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 2ch;
  height: 1em;
`

const Tooltip = styled.div`
  position: absolute;
  background: white;
  bottom: 1em;
  width: 100%;
  padding: 1ch;
  border: 1px solid ${Colors.fog_gray};
`
