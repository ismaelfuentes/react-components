// Libs
import * as React from 'react'
import { get } from 'lodash/fp'
import styled from 'styled-components'

// Components
import { FlagProps } from '../Table'
import Flag from './Flag'

interface Props {
  flags: FlagProps[]
  data: any
  editable: boolean
  uniqueFlag: boolean
  onChange?: (field: string, value: any) => void
}

interface FlagInList extends FlagProps {
  active: boolean
}

interface State {
  flags: FlagInList[]
}

class FlagContainer extends React.PureComponent<Props, State> {
  state = {
    flags: this.props.flags.map(f => ({
      ...f,
      active: get(f.field, this.props.data) === f.value,
    })),
  }

  private onFlagChange = (field: string, value: any) => {
    const flags = [...this.state.flags]
    const flag = flags.find(f => f.value === value)

    if (this.props.uniqueFlag && !flag?.active) {
      flags.map(f => (f.active = false))
    }

    if (flag) {
      flag.active = !flag?.active
    }

    this.setState({
      flags,
    })
    this.props.onChange && this.props.onChange(field, flag?.active && value)
  }

  render() {
    const { flags } = this.state

    return (
      <FlagsContainer>
        {flags.map((flag, index) => {
          return (
            <Flag
              key={'flag_' + index}
              flag={flag}
              active={flag.active}
              editable={!!this.props.editable}
              onChange={this.onFlagChange}
            />
          )
        })}
      </FlagsContainer>
    )
  }
}

export default FlagContainer

// //
// Styles
// //
const FlagsContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0px;
  left: 0px;
  z-index: 1;
`
