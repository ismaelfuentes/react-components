// Libs
import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import es from 'date-fns/locale/es'

// components
import Select from '../form/select/Select'
import { Label, Text } from './DatePicker'
import Colors from '../styles/colors.json'

// Props
interface Props {
  startDate: Date
  endDate?: Date
  onChange: (id: string, value: any) => void
  showDate?: boolean
}

export default function TimePicker(props: Props) {
  function renderTimeSelector(isHours = true, value: string, key: string) {
    const options = []

    if (isHours) {
      for (let i = 0; i <= 23; i++) {
        options.push((i < 10 ? '0' : '') + i.toString())
      }
    } else {
      for (let i = 0; i <= 45; i += 15) {
        options.push((i < 10 ? '0' : '') + i.toString())
      }
      options.push('59')
    }

    const formatedValue = value.length === 1 ? '0' + value : value

    return (
      <TimeSelectContainer>
        <Select
          id={key}
          key={key}
          smallSize
          options={options}
          value={formatedValue}
          onChange={props.onChange}
          emptyValue={''}
        />
      </TimeSelectContainer>
    )
  }
  const { startDate, endDate, showDate = true } = props

  const startHours = startDate.getHours().toString()
  const startMinutes = startDate.getMinutes().toString()
  const endHours = (endDate || new Date()).getHours().toString()
  const endMinutes = (endDate || new Date()).getMinutes().toString()

  return (
    <TimePickerContainer showDate={showDate}>
      <Label>Desde:</Label>
      {showDate && (
        <Text>{format(startDate, 'EEEEEE d/MM/yyyy', { locale: es })}</Text>
      )}
      {renderTimeSelector(true, startHours, `start_hours_${startHours}`)}:
      {renderTimeSelector(false, startMinutes, `start_mins_${startMinutes}`)}
      <TimeArrow>→</TimeArrow>
      <Label>Hasta:</Label>
      {showDate && (
        <Text>
          {format(endDate || new Date(), 'EEEEEE d/MM/yyyy', { locale: es })}
        </Text>
      )}
      {renderTimeSelector(true, endHours, `end_hours_${endHours}`)}:
      {renderTimeSelector(false, endMinutes, `end_mins_${endMinutes}`)}
    </TimePickerContainer>
  )
}

// //
// Styled components
// //

const TimePickerContainer = styled.div<{ showDate: boolean }>`
  width: 100%;
  height: 65px;
  padding: 15px 30px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: ${props =>
    props.showDate ? 'space-between' : 'flex-start'};
`

const TimeArrow = styled.div`
  color: ${Colors.normal_gray};
  font-weight: 700;
  font-size: 19px;
  margin: 0px 6px;
`

const TimeSelectContainer = styled.div`
  width: 55px;
  margin: 0px 2px;

  .react-input {
    margin: 0px;
  }
`
