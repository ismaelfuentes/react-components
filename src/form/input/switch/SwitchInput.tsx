// Libs
import * as React from 'react'
import styled from 'styled-components'

// Styles
import colors from '../../../styles/colors.json'

interface Props {
  id: string
  checked: boolean
  label: string
  onChange: (id: string, value: any) => void
}

export default function SwitchInput({ id, checked, onChange, label }: Props) {
  const handleOnChange = () => {
    if (onChange) {
      onChange(id, !checked)
    }
  }

  return (
    <div className="react-input">
      {label && (
        <label htmlFor="switch" className="react-input_label">
          {label}
        </label>
      )}
      <SwitchContainer>
        <CheckBox
          id="switch"
          type="checkbox"
          className="react-input_switch"
          onChange={handleOnChange}
          checked={checked}
        />
      </SwitchContainer>
    </div>
  )
}

////
// Styles
///

const SwitchContainer = styled.div`
  display: block;
`

const CheckBox = styled.input`
  /* hidden input */
  width: 1rem;
  height: 1rem;
  left: 10px;
  position: relative;
  appearance: none;
  /* probably not a good idea */
  outline: none;

  /* slider */
  ::after {
    content: '';
    display: block;
    width: 40px;
    height: 20px;
    border-radius: 100px;
    transition: 0.4s;
    cursor: pointer;
    border: 0.5px solid ${colors.dark_gray};
    background-color: ${colors.light_gray};
    box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.5);
  }
  /* slider ball */
  ::before {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    top: 0px;
    left: 0px;
    border-radius: 50%;
    background-color: white;
    transition: 0.4s;
    border: 0.5px solid ${colors.dark_gray};
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  }
  /* checked ball state */
  :checked::before {
    left: 20px;
  }
  /* checked slider state */
  :checked::after {
    background-color: ${colors.mermaid};
  }
  /* not checked ball state */
  :not(:checked)::before {
    right: 20px;
  }
`
