import React from 'react'
import styled from 'styled-components'
import Colors from '../styles/colors.json'

type Props = {
  id: string
  selected: boolean
  name: string
  value: any
  onChange: (value: any) => void
}

const RadioButton = (props: Props) => {
  const { name, id, onChange, value, selected } = props

  return (
    <Wrapper>
      <input aria-label="radio" id={id} type="radio" name={name} value={value} onChange={onChange} checked={selected} />
      <label htmlFor={id}></label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  input[type='radio'] {
    display: none;

    &:checked + label:before {
      border-color: ${Colors.blue_sea};
      background-color: ${Colors.blue_sea};
      animation: ripple 0.2s linear forwards;
    }

    &:checked + label:after {
      transform: scale(1);
    }
  }

  label {
    display: inline-block;
    height: 13px;
    position: relative;
    margin-bottom: 0px;
    cursor: pointer;
    vertical-align: middle;

    &:before,
    &:after {
      position: absolute;
      content: '';
      border-radius: 50%;
      transition: all 0.3s ease;
      transition-property: transform, border-color;
    }

    &:before {
      left: 0;
      top: 0;
      width: 13px;
      height: 13px;
      border: 2px solid ${Colors.gray_icon};
    }

    &:after {
      top: 4px;
      left: 4px;
      width: 5px;
      height: 5px;
      transform: scale(0);
      background: white;
    }
  }
`

export default RadioButton
