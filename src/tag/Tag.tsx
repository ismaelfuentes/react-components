import React from 'react'
import styled from 'styled-components'

// components
import Colors from '../styles/colors.json'
import DropDown from '../dropDown/DropDown'
import { Option } from '../form/select/Select'
import { default as Icon, Icons, IconColors, IconSizes } from '../icon/Icon'

function getColor(color: string) {
  const colors = {
    deep_blue: 'rgb(31,43,89)',
    cloudy: 'rgb(242,244,247)',
    white: 'rgb(255,255,255)',
    gray_icon: 'rgb(197,203,211)',
    normal_gray: 'rgb(126,140,156)',
    mermaid: 'rgb(16,212,171)',
    deep_gray: 'rgb(24,33,58)',
    dark_gray: 'rgb(74,99,124)',
    light_gray: 'rgb(164,175,187)',
    success_green: 'rgb(108,219,120)',
    critical_red: 'rgb(230,49,46)',
    orange: 'rgb(255,174,0)',
    blue_twitter: 'rgb(112,183,232)',
    blue_facebook: 'rgb(59,90,155)',
    dark_instagram: 'rgb(0,24,51)',
    red_youtube: 'rgb(192,0,0)',
    orange_media: 'rgb(255,154,0)',
    space_blue: 'rgb(0,82,163)',
    turquoise: 'rgb(57,230,172)',
    pink: 'rgb(255,100,138)',
    pastel_blue: 'rgb(173,188,255)',
    bubblegum_pink: 'rgb(255,143,228)',
    yellow_mustard: 'rgb(255,213,0)',
    violet: 'rgb(227,171,255)',
    pastel_orange: 'rgb(255,180,72)',
    green_apple: 'rgb(203,236,79)',
    pastel_pink: 'rgb(255,136,160)',
    brown: 'rgb(220,141,106)',
    blue_ocean: 'rgb(30,105,181)',
    blue_sea: 'rgb(74,144,226)',
    blue_caribbean: 'rgb(96,244,254)',
    blue_lake: 'rgb(107,175,243)',
    green_grass: 'rgb(138,221,136)',
    light_turquoise: 'rgb(100,235,187)',
    dark_turquoise: 'rgb(58,171,197)',
    purple: 'rgb(124,133,193)',
  }

  if (colors[color]) {
    return colors[color]
  } else {
    return color
  }
}

interface Props {
  className?: string
  color: string
  operator?: string
  children: React.ReactNode

  onClickTag?: () => void

  // Editable properties
  clearable?: boolean
  onRemove?: () => void
  editable?: boolean
  onEdit?: (selected: any) => void
  editOptions?: Option[]

  // To make the action option always visible
  persistentButton?: boolean

  // If a sentiment is specified, the text and the color will be the ones for that sentiment
  sentiment?: string
}

interface State {
  isOver: boolean
  isClicked: boolean
}

class Tag extends React.Component<Props, State> {
  state = {
    isOver: false,
    isClicked: false,
  }
  wrapperRef: any

  handleIsOver = (isOver: boolean) =>
    this.setState({
      isOver,
    })

  handleClick = () => {
    this.setState({ isClicked: !this.state.isClicked })
  }

  handleEdit = (option: Option | null) => {
    this.setState({ isClicked: false, isOver: false })

    if (option && this.props.onEdit) {
      this.props.onEdit(option)
    }
  }

  get clearButton() {
    return (
      <TagButton onClick={this.props.onRemove}>
        <Icon
          icon={Icons.Cross}
          color={IconColors.White}
          size={IconSizes.Small}
        />
      </TagButton>
    )
  }

  render() {
    const {
      children,
      className,
      color,
      operator,
      clearable = false,
      persistentButton,
      sentiment,
      editable,
      editOptions,
    } = this.props

    const finalText = sentiment ? getSentimentText(sentiment) : children
    const finalColor = sentiment ? getSentimentColor(sentiment) : color

    let tag = (
      <>
        {operator ? <TagOperator color={color}>{operator}</TagOperator> : null}
        <Text onClick={this.props.onClickTag}>{finalText}</Text>
        {clearable && (this.state.isOver || persistentButton)
          ? this.clearButton
          : null}
      </>
    )

    if (editable) {
      tag = (
        <>
          {this.state.isOver || this.state.isClicked || persistentButton ? (
            <>
              {editOptions && this.state.isClicked && (
                <DropDown options={editOptions} onSelect={this.handleEdit} />
              )}
              {tag}
              {clearable ? null : (
                <TagButton onClick={this.handleClick}>
                  <Icon
                    icon={Icons.Edit}
                    color={IconColors.White}
                    size={IconSizes.Small}
                  />
                </TagButton>
              )}
            </>
          ) : (
            tag
          )}
        </>
      )
    }

    return (
      <TagContainer
        onMouseEnter={() => this.handleIsOver(true)}
        onMouseLeave={() => this.handleIsOver(false)}
        className={className}
        color={finalColor}
      >
        {tag}
      </TagContainer>
    )
  }
}

export default Tag

// //
// Aux functions
// //
function getSentimentText(sentiment: string) {
  switch (sentiment) {
    case 'OBJECTIVE':
      return 'NEUTRO'
    case 'NEGATIVE':
      return 'NEGATIVO'
    case 'POSITIVE':
      return 'POSITIVO'
    default:
      return 'SIN SENTIMIENTO'
  }
}

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case 'OBJECTIVE':
      return Colors.orange
    case 'NEGATIVE':
      return Colors.critical_red
    case 'POSITIVE':
      return Colors.success_green
    default:
      return Colors.deep_blue
  }
}

// //
// Styles
// //

const TagContainer = styled.div<{ color: string }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  text-align: left;

  height: 22px;
  cursor: pointer;
  color: white;
  stroke: white;
  :not(:only-child) & {
    margin-right: 0px;
  }
  border-radius: 1px;
  margin: 2px;
  background-color: ${props => getColor(props.color)};
`

const Text = styled.p`
  /* tag text */
  margin: auto;
  padding: 0 6px;
  white-space: nowrap;

  text-transform: uppercase;

  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`

const TagOperator = styled.div<{ color: string }>`
  height: 22px;
  min-width: 22px;
  padding: 0 4px;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => getColor(props.color)};
`

export const TagButton = styled.button<{ height?: number }>`
  width: 22px;
  height: ${props => props.height || 22}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  border: 0;
  padding: 0px;
  border-radius: 1px;
  background-color: rgba(0, 0, 0, 0.15);
`
export const X = styled.span`
  font-size: 14px;
  height: 22px;
  width: 22px;
  display: inline-block;
  font-weight: bold;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.5);

  :hover {
    color: white;
  }
`
