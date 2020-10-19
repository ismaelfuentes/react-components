// Libs
import React from 'react'
import styled from 'styled-components'

// Components
import { Option } from '../form/select/Select'
import Colors from '../styles/colors.json'

interface Props {
  options: Option[]
  onSelect: (selected: Option | null) => void
}

const Dropdown = (props: Props) => {
  const { options, onSelect } = props

  const clickOutside = React.useCallback(() => {
    onSelect(null)
  }, [onSelect])

  React.useEffect(() => {
    window.addEventListener('click', clickOutside, false)

    return () => window.removeEventListener('click', clickOutside, false)
  }, [clickOutside])

  return (
    <DropDownContainer>
      {options.map((option: any, index: number) => {
        return (
          <DropDownRow key={index} onClick={() => onSelect(option.value)}>
            {option.label}
          </DropDownRow>
        )
      })}
    </DropDownContainer>
  )
}

export default React.memo(Dropdown)

// //
// Styles
// //
const DropDownContainer = styled.div<{ lefty?: boolean }>`
  position: absolute;
  top: 25px;
  width: 100px;
  background: white;
  border: 1px solid ${Colors.light_gray};
  border-radius: 3px;
  padding: 5px 15px;
  z-index: 1;
`

const DropDownRow = styled.div`
  color: ${Colors.normal_gray};
  width: 100%;
  height: 25px;
  font-size: 13px;
  display: flex;
  align-items: center;
`
