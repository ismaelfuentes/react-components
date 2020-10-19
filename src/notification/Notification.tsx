// Libs
import * as React from 'react'

// State and props
interface Props {
  // Identifiers of the dom elements
  testId?: string
  text: string

  // Type (color) of the button
  type?: string

  // Callback when clicked
  onClick: () => void

  // disable the user to click it
  disabled?: boolean
}

// //
// Component
// //
class Button extends React.PureComponent<Props, {}> {
  render() {
    const {
      testId,
      text,
      type = 'success',
      onClick,
      disabled = false,
    } = this.props

    return (
      <div
        className={`react-button ${disabled ? 'react-button--disabled' : 'react-button-' + type
          }`}
        onClick={disabled ? undefined : onClick}
        data-test={testId}
      >
        {text}
      </div>
    )
  }
}

export default Button
