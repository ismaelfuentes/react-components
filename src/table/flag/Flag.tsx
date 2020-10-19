// Libs
import * as React from 'react'
import styled from 'styled-components'

// Components
import { FlagProps } from '../Table'

// Styles
import colors from '../../styles/colors.json'

interface Props {
  flag: FlagProps
  active: boolean
  editable: boolean
  onChange?: (field: string, value: any) => void
}

class FlagComponent extends React.Component<Props, {}> {
  private handleChange = () => {
    this.props.onChange &&
      this.props.onChange(this.props.flag.field, this.props.flag.value)
  }

  render() {
    const { flag, editable, active } = this.props

    if (!editable && !active) {
      return <></>
    }

    if (editable) {
      return (
        <EditableFlag
          flagstyle={flag.style}
          flagactive={active}
          onClick={this.handleChange}
          className="editable-flag"
        >
          {flag.value}
        </EditableFlag>
      )
    } else {
      return <Flag flagstyle={flag.style}>{flag.value}</Flag>
    }
  }
}

export default FlagComponent

// //
// Styles
// //
const Flag = styled.div<{ flagstyle?: string }>`
  font-size: 9px;
  color: ${props =>
    props.flagstyle === 'alert' ? colors.red_youtube : colors.blue_ocean};
  border: 1px solid
    ${props =>
      props.flagstyle === 'alert' ? colors.red_youtube : colors.blue_ocean};
  border-radius: 2px;
  padding: 0px 1px;
  margin: 1px;
`

const EditableFlag = styled.div<{ flagstyle?: string; flagactive: boolean }>`
  font-size: 9px;
  color: ${props =>
    props.flagactive
      ? props.flagstyle === 'alert'
        ? colors.red_youtube
        : colors.blue_ocean
      : colors.normal_gray};
  border: 1px solid
    ${props =>
      props.flagactive
        ? props.flagstyle === 'alert'
          ? colors.red_youtube
          : colors.blue_ocean
        : colors.normal_gray};
  border-radius: 2px;
  padding: 0px 1px;
  margin: 1px;
  cursor: pointer;

  ${props => !props.flagactive && 'opacity: 0;'}

  &:hover {
    border: 1px solid ${colors.success_green};
  }
`
