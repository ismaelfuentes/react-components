// Libs
import React from 'react'
import styled from 'styled-components'

// Components
import {
  DatePickerRanges,
  DatePickerRealTimes,
  HeaderOption,
  Label,
} from './DatePicker'
import { GridContainer, GridRow, GridSizes } from '../grid/Grid'
import TimePicker from './TimePicker'
import RadioButton from '../radioButton'

// Props
interface Props {
  realTimeAvailable: boolean
  realTimePeriod?: DatePickerRealTimes
  dateRangeSelected: DatePickerRanges
  onRealTimeRangeSelected: Function
  onTodayChange: (event: any) => void
  startDate: Date
  endDate?: Date
  onTimeChange: (id: string, value: any) => void
}

export default function TodayPicker(props: Props) {
  const {
    dateRangeSelected,
    realTimePeriod,
    realTimeAvailable,
    startDate,
    endDate,
  } = props

  return (
    <GridContainer separated="none">
      {realTimeAvailable && (
        <React.Fragment>
          <GridRow size={GridSizes.UNIQUE}>
            <RadioContainer>
              <RadioButton
                name="time"
                id="time"
                selected={dateRangeSelected === DatePickerRanges.RealTime}
                value={DatePickerRanges.RealTime}
                onChange={props.onTodayChange}
              />
            </RadioContainer>
          </GridRow>
          <GridRow size={GridSizes.MINUS_UNIQUE}>
            <RealTimeContainer>
              <Label>Tiempo real:</Label>
              <HeaderOption
                selected={realTimePeriod === DatePickerRealTimes.Thirty}
                onClick={() =>
                  props.onRealTimeRangeSelected(DatePickerRealTimes.Thirty)
                }
              >
                Última media hora
              </HeaderOption>
              <HeaderOption
                selected={realTimePeriod === DatePickerRealTimes.Sixty}
                onClick={() =>
                  props.onRealTimeRangeSelected(DatePickerRealTimes.Sixty)
                }
              >
                Última hora
              </HeaderOption>
              <HeaderOption
                selected={realTimePeriod === DatePickerRealTimes.Ninety}
                onClick={() =>
                  props.onRealTimeRangeSelected(DatePickerRealTimes.Ninety)
                }
              >
                Última hora y media
              </HeaderOption>
            </RealTimeContainer>
          </GridRow>
        </React.Fragment>
      )}
      <GridRow size={GridSizes.UNIQUE} newLine>
        <RadioContainer>
          <RadioButton
            name="today"
            id="today"
            selected={dateRangeSelected === DatePickerRanges.Today}
            value={DatePickerRanges.Today}
            onChange={props.onTodayChange}
          />
        </RadioContainer>
      </GridRow>
      <GridRow size={GridSizes.MINUS_UNIQUE}>
        <TimePicker
          startDate={startDate}
          endDate={endDate}
          onChange={props.onTimeChange}
          showDate={true}
        />
      </GridRow>
    </GridContainer>
  )
}

// //
// Styles
// //
const RadioContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const RealTimeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  box-sizing: border-box;
`
