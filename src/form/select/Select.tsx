// Libs
import * as React from 'react'
import ReactSelect, { components, OptionsType, ValueType } from 'react-select'
import styled from 'styled-components'

// Components
import Icon, { Icons } from '../../icon/Icon'
import Input from '../input/Input'
import Colors from '../../styles/colors.json'

// Select types
import SentimentSelector from './selectors/SentimentSelector'
import { isEmptyOrNull, isStringArray } from '../../utils/Utils'
import { isArray, isString } from 'lodash'

// Interfaces
export interface Option {
  value: string | number
  label: string
  color?: string
}

// Types
export enum SelectTypes {
  NORMAL = 'normal',
  SENTIMENT_SELECTOR = 'sentimentSelector',
}

// State and props
interface Props {
  // Identifiers for the dom element
  id: string
  testId?: string

  // Type of selector
  type?: SelectTypes

  // Callback to trigger when the value change
  onChange: (id: string, value: any) => void
  onChangeJustValue?: boolean

  // Label to show over the input
  label?: string

  // is the value selected errored? and what text to show as error
  error?: boolean
  errorText?: string

  // Value to apply on the selector
  value?: string | OptionsType<Option> | Option

  // Possible options of the select
  options?: OptionsType<Option> | string[]

  // Can be empty and can be removable? message to show when the input is empty
  showEmpty?: boolean
  emptyValue?: string

  // In case it has to be disabled and the user cannot change the value
  disabled?: boolean

  // Is the input transparent
  transparentInput?: boolean

  // Multiple options can be chosen at once
  multi?: boolean

  // the input wont occupy the 100% of the width
  fullWidth?: boolean

  // make the select smaller
  smallSize?: boolean

  // Show tooltip when the mouse is over the title
  tooltipText?: string

  // Is the input in a config view?
  isConfig?: boolean
}

interface State {
  value?: ValueType<Option>
  options: OptionsType<Option>
}
// //
// Helpers
// //
export const isOptionType = (args: any): args is Option => (args as Option).label !== undefined
export const isArrayOptionType = (args: any): args is Option[] => isArray(args as Option[])

export const isStringArrayType = (args: any): args is string[] => isStringArray(args)
export const isValueType = (args: any): args is ValueType<Option> => !isStringArray(args) && !isOptionType(args)
export const isOptionsType = (args: any): args is OptionsType<Option> => !isStringArrayType(args)
// //
// Component
// //

export default class Select extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    let options = props.options || []

    if (isStringArray(options)) {
      options = this.transformToOptionList(props.options as string[])
    }

    this.state = {
      options: options as OptionsType<Option>,
    }

    if (isString(props.value)) {
      const option = this.state.options.find(op => op.value === props.value)

      this.state = {
        ...this.state,
        value: option,
      }
    } else {
      const val = {
        ...this.state,
        value: props.value,
      }

      if (
        Array.isArray(props.value) &&
        props.value.length > 0 &&
        typeof props.value[0] === 'string' &&
        props.options &&
        props.options.length
      ) {
        const createValueList = (values: string[], options: OptionsType<Option>): any => {
          return values.map(v => options.find(o => o.value === v))
        }

        val.value = createValueList(props.value, this.state.options)
      }
      this.state = {
        ...this.state,
        ...val,
      }
    }
  }

  transformToOptionList = (values: string[]) => {
    return values.map(value => ({
      value,
      label: value,
    }))
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return nextProps.value !== nextState.value || this.state.value !== nextState.value
  }

  handleChange = (selected: ValueType<Option> | string) => {
    if (this.props.onChange) {
      if (this.props.onChangeJustValue && isOptionType(selected)) {
        this.props.onChange(this.props.id, selected?.value)
      } else {
        this.props.onChange(this.props.id, selected)
      }
    }

    this.setState({
      value: selected as any,
    })
  }

  resetSelect = () => {
    this.setState(prevState => {
      const state = {
        ...prevState,
        value: {
          label: '',
          value: '',
        },
      }

      return state
    })

    if (this.props.onChange) {
      this.props.onChange(this.props.id, undefined)
    }
  }

  isValidValue = (value: Option | OptionsType<Option>) => {
    if (isEmptyOrNull(value)) {
      return false
    }

    if (isOptionsType(value)) {
      return !!value
    }

    if (isOptionType(value)) {
      return value !== null
    }

    return false
  }

  renderSelector = () => {
    const {
      id,
      testId,
      label,
      multi = false,
      showEmpty,
      disabled,
      emptyValue = this.props.multi ? 'selecciona varias opciones' : 'selecciona una opción',
      transparentInput,
      isConfig,
      smallSize = false,
    } = this.props

    const { value, options } = this.state
    const customStyles = getCustomStyles({
      transparentInput,
      isConfig,
      smallSize,
    })

    const DropdownIndicator = (props: any) => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <ArrowContainer>
              <Icon icon={props.selectProps.menuIsOpen ? Icons.UpArrow : Icons.DownArrow} />
            </ArrowContainer>
          </components.DropdownIndicator>
        )
      )
    }

    switch (this.props.type) {
      case SelectTypes.SENTIMENT_SELECTOR:
        return (
          <SentimentSelector
            onChange={this.handleChange}
            customStyles={customStyles}
            dropDownIndicator={{ DropdownIndicator }}
            value={(this.props.value as Option | string) || undefined}
            emptyValue={emptyValue}
          />
        )

      default:
        return (
          <React.Fragment>
            <ReactSelect
              components={{ DropdownIndicator }}
              styles={customStyles}
              data-test={testId}
              value={this.isValidValue(value as OptionsType<Option>) ? value : []}
              placeholder={emptyValue}
              name={label}
              id={id}
              onChange={this.handleChange}
              options={options}
              backspaceToRemoveMessage=""
              isMulti={multi}
            />
            {!multi && this.isValidValue(value as OptionsType<Option>) && showEmpty && !disabled && (
              <ResetSelect onClick={this.resetSelect}>x</ResetSelect>
            )}
          </React.Fragment>
        )
    }
  }

  render() {
    const { label, error, fullWidth = true, tooltipText } = this.props

    return (
      <SelectContainer fullWidth={fullWidth} className={`react-input ${error ? 'react-input--error' : ''}`}>
        {label && <Input id="none" type="none" label={label} tooltipText={tooltipText} />}
        {this.renderSelector()}
      </SelectContainer>
    )
  }
}

// //
// Styles
// //

function getCustomStyles(props: any = {}) {
  const { transparentInput, isConfig, smallSize } = props

  return {
    container: (provided: any) => ({
      ...provided,
      marginLeft: isConfig ? '-15px' : 'unset',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: transparentInput ? 'transparent' : state.isFocused ? Colors.light_gray : '#dbdbdb',
      '&:hover': { borderColor: Colors.light_gray }, // border style on hover
      boxShadow: 'none',
      height: smallSize ? '35px' : '45px',
      minHeight: smallSize ? '35px' : '45px',
      borderRadius: '2px',
      backgroundColor: transparentInput ? 'transparent' : 'white',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: '0px 3px 0px 0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: '0px',
      borderRadius: '2px',
    }),
    multiValueLabel: (styles: any) => {
      const labelStyles = { ...styles }

      return {
        ...labelStyles,
        color: 'white',
        fontWeight: smallSize ? 'normal' : 'bold',
        padding: smallSize ? '2px 5px' : '6px 12px;',
        paddingLeft: 'none',
      }
    },
    multiValue: (styles: any, { data }: { data: any }) => {
      const labelStyles = { ...styles }

      labelStyles.backgroundColor = data.color ? data.color : '#4D6680'

      return {
        ...labelStyles,
      }
    },
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.2)',
      ':hover': {
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? Colors.blue_sea : Colors.normal_gray,
      height: smallSize ? '35px' : '45px',
      lineHeight: smallSize ? '20px' : '30px',
      fontWeight: state.isSelected ? '600' : state.isFocused ? '500' : 'normal',
      fontSize: '14px',
      backgroundColor: state.isFocused ? '#F2F4F7' : 'white',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: '14px',
      color: '#adb3bd',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: '14px',
      color: '#4A637C',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: smallSize ? '2px 8px 2px 10px' : provided.padding,
    }),
  }
}

const SelectContainer = styled.div<{ fullWidth: boolean }>`
  position: relative;
  ${props => (props.fullWidth ? '' : 'width: 100%;')}
`

const ResetSelect = styled.div`
  position: absolute;
  right: 40px;
  bottom: 14px;
  min-height: 1em;
  line-height: 1em;
  font-weight: bold;
  color: ${Colors.gray_icon};
  cursor: pointer;
  width: 15px;
  text-align: center;
`

const ArrowContainer = styled.div`
  padding-right: 7px;
  padding-bottom: 2px;
`
