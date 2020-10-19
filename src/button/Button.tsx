// Libs
import * as React from 'react'
import styled from 'styled-components'

// Components
import { Icons, default as Icon, IconColors } from '../icon/Icon'
import Colors from '../styles/colors.json'

// Types
export enum ButtonTypes {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
  FLAT = 'flat',
  EMPTY = 'empty',
  INPUT = 'input',
}

// State and props
interface Props {
  // Identifiers of the dom elements
  testId?: string
  text: string
  children?: React.ReactNode

  // Show an icon before the text
  icon?: Icons

  // Type (color) of the button
  type?: ButtonTypes | string // Allow string because of old use of buttons

  // Callback when clicked
  onClick: () => void

  // disable the user to click it
  disabled?: boolean
}

// //
// Component
// //
class Button extends React.PureComponent<Props, {}> {
  renderIcon = (icon: Icons) => {
    return (
      <IconContainer>
        <Icon icon={icon} color={IconColors.White} />
      </IconContainer>
    )
  }

  render() {
    const {
      testId,
      text,
      children,
      type = 'success',
      onClick,
      disabled = false,
      icon,
    } = this.props

    return (
      <ButtonContainer
        type={type}
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        data-test={testId}
      >
        {icon && this.renderIcon(icon)}
        {text || children}
      </ButtonContainer>
    )
  }
}

export default Button

// //
// Styles
// //

const ButtonTypeStyles = {
  [ButtonTypes.SUCCESS]: `
    background-color: #10d4ab;
    &:hover {
      background-color: #0db18f;
    }
  `,

  [ButtonTypes.INFO]: `
    background-color: #3d96ef;
    &:hover {
      background-color: #2d80d2;
    }
  `,

  [ButtonTypes.WARNING]: `
    background-color: #ffad43;
    &:hover {
      background-color: #e48f21;
    }
  `,

  [ButtonTypes.DANGER]: `
    background-color: #ff3e3e;
    &:hover {
      background-color: #e02a2a;
    }
  `,

  [ButtonTypes.FLAT]: `
    background-color: ${Colors.light_gray};
    &:hover {
      background-color: ${Colors.normal_gray};
    }
  `,

  [ButtonTypes.EMPTY]: `
    background-color: white;
    border: 1px solid #3d96ef;
    color: #3d96ef;
    &:hover {
      border: 1px solid #74b4f3;
      color: #74b4f3;
      background-color: white;
      
      & svg {
        color: #74b4f3 !important;
        fill: #74b4f3 !important;
      }
    }
    & svg {
      color: #3d96ef !important;
      fill: #3d96ef !important;
    }
  `,

  [ButtonTypes.INPUT]: `
    background-color: white;
    color: #a5a5a5;
    font-size: 31px;
    font-weight: normal;
    padding: 0 14px;
    box-shadow: 0px 0px 1px 0px rgba(195, 195, 195, 0.3);

    &:hover {
      box-shadow: 0px 0px 1px 0px rgba(195, 195, 195, 1);
      color: #b3c0ce;
    }
  `,
}

const ButtonContainer = styled.div<{
  type?: ButtonTypes | string
  disabled?: boolean
}>`
  display: inline-flex;
  width: fit-content;
  padding: 0px 15px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  background-color: #10d4ab;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #ffffff;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #0db18f;
  }

  ${props => ButtonTypeStyles[props.type || ButtonTypes.SUCCESS]}

  ${props =>
    props.disabled &&
    `
    background-color: #d8d8d8;
    cursor: not-allowed;

    &:hover {
      background-color: #d8d8d8;
    }
  `}
`

const IconContainer = styled.div`
  display: inline-flex;
  height: 100%;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
`
