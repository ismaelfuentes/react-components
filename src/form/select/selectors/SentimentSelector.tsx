// Libs
import * as React from 'react'
import ReactSelect, { OptionsType, ValueType } from 'react-select'

// Components
import Colors from '../../../styles/colors.json'
import { isEmptyOrNull } from '../../../utils/Utils'
import {
  isArrayOptionType,
  isOptionsType,
  isOptionType,
  Option,
} from '../Select'

// State and props
interface Props {
  // Callback to trigger when the value change
  onChange: (value: any) => void

  // Value to apply on the selector
  value?: string | ValueType<Option>
  emptyValue?: string

  // Custom styles
  customStyles: any
  dropDownIndicator: Partial<any>
}

interface State {
  value?: ValueType<Option>
  options: OptionsType<Option>
}

// //
// Component
// //

export default class Select extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const options = [
      {
        label: 'POSITIVO',
        value: 'POSITIVE',
        color: Colors.success_green,
      },
      {
        label: 'NEGATIVO',
        value: 'NEGATIVE',
        color: Colors.critical_red,
      },
      {
        label: 'NEUTRO',
        value: 'OBJECTIVE',
        color: Colors.orange,
      },
    ]

    this.state = {
      options: options as Array<Option>,
    }

    if (typeof props.value === 'string') {
      const option = options.find(op => op.value === props.value)

      this.state = {
        ...this.state,
        value: [option as Option],
      }
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      nextProps.value !== nextState.value ||
      this.state.value !== nextState.value
    )
  }

  handleChange = (selected: ValueType<Option>) => {
    if (!selected) {
      selected = []
    }

    if (isArrayOptionType(selected) && selected.length > 1) {
      selected.shift()
    }

    if (this.props.onChange) {
      this.props.onChange(selected[0])
    }

    this.setState({
      value: selected,
    })
  }

  isValidValue = (value: Option | OptionsType<Option> | undefined) => {
    if (isEmptyOrNull(value)) {
      return false
    }

    if (isOptionsType(value)) {
      return value.length > 0
    }

    if (isOptionType(value)) {
      return !!value.value
    }

    return false
  }

  render() {
    const { customStyles, dropDownIndicator, emptyValue } = this.props

    const { value, options } = this.state

    return (
      <ReactSelect
        components={dropDownIndicator}
        styles={customStyles}
        value={this.isValidValue(value as OptionsType<Option>) ? value : []}
        name={'sentimentSelector'}
        placeholder={emptyValue}
        id={'sentimentSelector'}
        onChange={this.handleChange}
        options={options}
        backspaceToRemoveMessage=""
        isMulti={true}
      />
    )
  }
}
