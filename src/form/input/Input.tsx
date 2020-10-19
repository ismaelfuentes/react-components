// Styles
import './Input.scss'

// Libs
import * as React from 'react'
import { set } from 'lodash/fp'
import styled from 'styled-components'

// components
import colors from '../../styles/colors.json'

// State and props
interface Props {
  // Identifiers for the dom element
  id: string
  testId?: string

  // Type of input
  type: string

  // Callback to trigger when the value change
  onChange?: (id: string, value: any) => void

  // Callback to trigger when the user is editing the input
  onKeyEnter?: (id: string, value: any) => void

  // Label to show over the input
  label?: string

  // Text on the background to tell the user what to do
  placeholder?: string

  // Is the input mandatory
  required?: boolean

  // is the value selected errored? and what text to show as error
  error?: boolean
  errorText?: string

  // In case it has to be disabled and the user cannot change the value
  disabled?: boolean

  // Value to apply on the selector
  value?: string | boolean

  // Show tooltip when the mouse is over the title
  tooltipText?: string

  // Is the input in a config view?
  isConfig?: boolean
}

interface State {
  tooltipShown: boolean
}

// //
// Component
// //

class Input extends React.PureComponent<Props, State> {
  state: State = {
    tooltipShown: false,
  }

  setTooltipVisibility = (visible: boolean) => {
    this.setState({
      tooltipShown: visible,
    })
  }

  render() {
    const {
      id,
      testId,
      type,
      onChange,
      onKeyEnter,
      label,
      placeholder,
      required,
      error,
      errorText,
      disabled,
      value,
      tooltipText,
      isConfig,
    } = this.props

    const { tooltipShown } = this.state

    const handleChange = (event: any) => {
      if (onChange) {
        onChange(id, event.target.value)
      }
    }

    const handleFileChange = (event: any) => {
      if (onChange) {
        onChange(id, event)
      }
    }

    const onCheckboxChange = (event: any) => {
      if (onChange) {
        onChange(id, event.target.checked)
      }
    }

    const handleKeyPress = (event: any) => {
      if (onKeyEnter && event.key === 'Enter') {
        onKeyEnter(id, event.target.value)
      }
    }

    const renderInput = (
      type: string,
      placeholder?: string,
      disabled = false,
      value?: string | boolean,
      required?: boolean,
      isConfig?: boolean
    ) => {
      switch (type) {
        case 'text':
        case 'password':
        case 'email':
        case 'number':
          return (
            <input
              data-test={testId}
              id={id}
              className={`react-input_input react-input_text ${isConfig &&
                'react-input_input--isConfig'}`}
              type={type}
              placeholder={placeholder}
              onChange={handleChange}
              disabled={disabled}
              value={value as string}
              required={required}
              onKeyPress={handleKeyPress}
            />
          )

        case 'file':
          return (
            <input
              data-test={testId}
              id={id}
              className={`react-input_input react-input_text ${isConfig &&
                'react-input_input--isConfig'}`}
              type="file"
              placeholder={placeholder}
              onChange={handleFileChange}
              disabled={disabled}
              value={value as string}
              required={required}
            />
          )

        case 'checkbox':
          return (
            <input
              data-test={testId}
              className="react-input_input react-input_checkbox"
              type="checkbox"
              onChange={onCheckboxChange}
              disabled={disabled}
              defaultChecked={!!value}
            />
          )

        case 'expandableText':
          return (
            <textarea
              data-test={testId}
              id={id}
              placeholder={placeholder}
              className={`react-input_input react-input_text ${isConfig &&
                'react-input_input--isConfig'}`}
              onChange={e => {
                e.target.style.height = ''
                e.target.style.height = e.target.scrollHeight + 'px'
                handleChange(e)
              }}
              disabled={disabled}
              defaultValue={value as string}
              required={required}
              onKeyPress={handleKeyPress}
            />
          )

        default:
          return <></>
      }
    }

    return (
      <div
        className={`react-input ${error ? 'react-input--error' : ''
          } ${type === 'none' && 'react-input--empty'}`}
      >
        {label && (
          <div
            className="react-input_label"
            onMouseEnter={() => this.setTooltipVisibility(true)}
            onMouseLeave={() => this.setTooltipVisibility(false)}
          >
            {label}
          </div>
        )}
        {renderInput(type, placeholder, disabled, value, required, isConfig)}
        {error && errorText && (
          <div className="react-input_error-text">{errorText}</div>
        )}
        {tooltipShown && tooltipText && (
          <TooltipContainer>
            <Tooltip>{tooltipText}</Tooltip>
          </TooltipContainer>
        )}
      </div>
    )
  }
}

export default Input

// //
// Generic input change handler function
// //
export function onInputChange(id: string, value: any): void {
  // The context must be binded to the function in the component that will use it
  // @ts-ignore
  this.setState(set(id, value, {}))
}

// //
// Styles
// //
const TooltipContainer = styled.div`
  position: absolute;
  top: -5px;
  left: 0px;
  width: 210px;
`

const Tooltip = styled.div`
  position: absolute;
  background: ${colors.tooltip_gray};
  color: white;
  padding: 3px 7px;
  bottom: 0px;
  left: 0px;
  border-radius: 3px;
  font-size: 12px;
  line-height: 15px;
  max-width: 100%;
`
