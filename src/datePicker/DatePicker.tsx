// Libs
import * as React from 'react'
import styled from 'styled-components'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import {
  startOfDay,
  endOfDay,
  addDays,
  startOfMonth,
  startOfYear,
} from 'date-fns'

// Components
import Colors from '../styles/colors.json'
import MonthPicker from './MonthPicker'
import TimePicker from './TimePicker'
import { default as Button, ButtonTypes } from '../button/Button'
import TodayPicker from './TodayPicker'

export enum DatePickerRanges {
  Custom = 0,
  Today = 1,
  Week = 2,
  Month = 3,
  Year = 4,
  RealTime = 5,
}

export enum DatePickerRealTimes {
  Thirty = 30,
  Sixty = 60,
  Ninety = 90,
  None = -1,
}

// State and props
export interface DatePickerProps {
  onChange: Function
  startDate?: Date
  endDate?: Date
  dateRange?: DatePickerRanges
  realTimePeriod?: DatePickerRealTimes
  realTimeAvailable?: boolean
  hideTimeSelector?: boolean
  hideTodayOption?: boolean
  minDate?: Date
  maxDate?: Date
}

interface State {
  startDate: Date
  startMonth: number
  startYear: number
  endDate?: Date
  endMonth: number
  endYear: number
  dateRangeSelected: DatePickerRanges
  realTimePeriod?: DatePickerRealTimes
  temporalEndDate?: Date
}

// //
// Component
// //
class DatePicker extends React.PureComponent<DatePickerProps, State> {
  static defaultProps = {
    startDate: new Date(),
    endDate: new Date(),
    realTimeAvailable: true,
    hideTimeSelector: false,
    hideTodayOption: false,
    realTimePeriod: DatePickerRealTimes.None,
  }

  constructor(props: DatePickerProps) {
    super(props)
    registerLocale('es', es)

    const { startDate, endDate } = props

    const state = {
      startDate: startDate,
      startMonth: startDate?.getMonth(),
      startYear: startDate?.getFullYear(),
      endDate: endDate,
      endMonth: endDate?.getMonth(),
      endYear: endDate?.getFullYear(),
      dateRangeSelected:
        props.dateRange != null ? props.dateRange : DatePickerRanges.Week,
      realTimePeriod: props.realTimePeriod,
    }

    this.state = this.checkSameMonth(state)

    if (
      !props.startDate &&
      this.state.dateRangeSelected !== DatePickerRanges.RealTime
    ) {
      this.handleDateRangeWeek()
    }
  }

  handleRealTimeRangeSelected = (minutes: number) => {
    this.setState({
      realTimePeriod: minutes,
      dateRangeSelected: DatePickerRanges.RealTime,
    })
  }

  handleTimeChange = (key: string, value: any) => {
    const realValue = parseInt(value.value, 10)
    const { startDate, endDate } = this.state
    const date = key.indexOf('start') !== -1 ? startDate : endDate

    if (key.indexOf('hours') !== -1) {
      date?.setHours(realValue)
    } else {
      date?.setMinutes(realValue)
    }
    this.setState(state => {
      const newState: any = {
        startDate,
        endDate,
      }

      if (state.dateRangeSelected === DatePickerRanges.RealTime) {
        newState.dateRangeSelected = DatePickerRanges.Today
      }

      return newState
    })
  }

  handleDateRangeCustom = () => {
    this.setState({ dateRangeSelected: DatePickerRanges.Custom })
  }

  handleDateRangeToday = () => {
    const start = startOfDay(new Date())
    const end = endOfDay(new Date())
    const state = {
      dateRangeSelected: DatePickerRanges.Today,
      startDate: start,
      endDate: end,
    }

    this.setState(this.checkSameMonth(state))
  }

  handleDateRangeWeek = () => {
    const start = addDays(startOfDay(new Date()), -6)
    const end = endOfDay(new Date())
    const state = {
      dateRangeSelected: DatePickerRanges.Week,
      startDate: start,
      startMonth: start.getMonth(),
      startYear: start.getFullYear(),
      endDate: end,
      endMonth: end.getMonth(),
      endYear: end.getFullYear(),
    }

    this.setState(this.checkSameMonth(state))
  }

  handleDateRangeMonth = () => {
    const start = startOfMonth(startOfDay(new Date()))
    const end = endOfDay(new Date())
    const state = {
      dateRangeSelected: DatePickerRanges.Month,
      startDate: start,
      startMonth: start.getMonth(),
      startYear: start.getFullYear(),
      endDate: end,
      endMonth: end.getMonth(),
      endYear: end.getFullYear(),
    }

    this.setState(this.checkSameMonth(state))
  }

  handleDateRangeYear = () => {
    const start = startOfYear(new Date())
    const end = endOfDay(new Date())
    const state = {
      dateRangeSelected: DatePickerRanges.Year,
      startDate: start,
      startMonth: start.getMonth(),
      startYear: start.getFullYear(),
      endDate: end,
      endMonth: end.getMonth(),
      endYear: end.getFullYear(),
    }

    this.setState(this.checkSameMonth(state))
  }

  handleTodayChange = (e: any) => {
    const option = parseInt(e.currentTarget.value)

    this.setState({
      dateRangeSelected: option,
    })

    if (
      option === DatePickerRanges.RealTime &&
      this.state.realTimePeriod === DatePickerRealTimes.None
    ) {
      this.setState({
        realTimePeriod: DatePickerRealTimes.Thirty,
      })
    } else {
      this.setState({
        realTimePeriod: DatePickerRealTimes.None,
      })
    }
  }

  handleApplyChanges = () => {
    this.props.onChange({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      realTimePeriod: this.state.realTimePeriod,
      dateRange: this.state.dateRangeSelected,
    })
  }

  handleMouseEnterEnd = () => {
    if (this.state.startDate && !this.state.endDate) {
      const end = new Date(this.state.startDate)

      end.setFullYear(end.getFullYear() + 1)
      this.setState({
        temporalEndDate: end,
      })
    }
  }

  handleMouseEnterStart = () => {
    if (
      this.state.startDate &&
      !this.state.endDate &&
      this.state.temporalEndDate
    ) {
      this.setState({
        temporalEndDate: undefined,
      })
    }
  }

  handleCalendarDateChange = (dates: any) => {
    const [startDate, endDate] = dates
    const exactEnd = !endDate ? undefined : endOfDay(endDate)
    const start = startOfDay(startDate)

    this.setState({
      startDate: start,
      endDate: exactEnd,
      temporalEndDate: endDate,
      dateRangeSelected: DatePickerRanges.Custom,
    })
  }

  handleChangeHeader = (headerIndex: number, month: number, year: number) => {
    const dateString = headerIndex === 0 ? 'start' : 'end'
    const newState = {}

    newState[`${dateString}Month`] = month
    newState[`${dateString}Year`] = year
    this.setState(this.checkSameMonth(newState, headerIndex))
  }

  renderEmptyHeader = () => {
    return <React.Fragment />
  }

  renderWeekDays = () => {
    return (
      <WeekDaysContainer>
        <WeekDay>L</WeekDay>
        <WeekDay>M</WeekDay>
        <WeekDay>X</WeekDay>
        <WeekDay>J</WeekDay>
        <WeekDay>V</WeekDay>
        <WeekDay>S</WeekDay>
        <WeekDay>D</WeekDay>
      </WeekDaysContainer>
    )
  }

  checkSameMonth = (newState: any, calendarChanged = 1) => {
    const state = {
      ...this.state,
      ...newState,
    }

    if (
      state.startMonth === state.endMonth &&
      state.startYear === state.endYear
    ) {
      if (calendarChanged === 0) {
        const maxDate = this.props.maxDate || new Date()
        // Dont change if we are at the limit

        if (
          maxDate.getMonth() === state.endMonth &&
          maxDate.getFullYear() === state.endYear
        ) {
          return state
        }
        // change otherwise
        state.endMonth = state.endMonth + (1 % 12)

        if (state.endMonth === 0) {
          state.endYear = state.endYear + 1
        }
      } else {
        // Dont change if we are at the limit
        if (
          this.props.minDate &&
          this.props.minDate.getMonth() === state.startMonth &&
          this.props.minDate.getFullYear() === state.startYear
        ) {
          return state
        }

        // change otherwise
        if (state.startMonth === 0) {
          state.startMonth = 11
          state.startYear = state.startYear--
        } else {
          state.startMonth--
        }
      }
    }

    return state
  }

  render() {
    const {
      startDate,
      startMonth,
      startYear,
      endDate,
      endMonth,
      endYear,
      dateRangeSelected,
      realTimePeriod,
      temporalEndDate,
    } = this.state
    const selectedStart = new Date()

    selectedStart.setDate(1)
    selectedStart.setMonth(startMonth)
    selectedStart.setFullYear(startYear)
    const selectedEnd = new Date()

    selectedEnd.setDate(1)
    selectedEnd.setMonth(endMonth)
    selectedEnd.setFullYear(endYear)
    const {
      realTimeAvailable,
      hideTimeSelector,
      hideTodayOption,
      minDate,
      maxDate,
    } = this.props

    return (
      <DatePickerContainer>
        <Header>
          <Label>Rango:</Label>
          <HeaderOption
            selected={dateRangeSelected === DatePickerRanges.Custom}
            onClick={this.handleDateRangeCustom}
          >
            Personalizado
          </HeaderOption>
          {!hideTodayOption && (
            <HeaderOption
              selected={
                dateRangeSelected === DatePickerRanges.Today ||
                dateRangeSelected === DatePickerRanges.RealTime
              }
              onClick={this.handleDateRangeToday}
            >
              Hoy
            </HeaderOption>
          )}
          <HeaderOption
            selected={dateRangeSelected === DatePickerRanges.Week}
            onClick={this.handleDateRangeWeek}
          >
            Últimos 7 días
          </HeaderOption>
          <HeaderOption
            selected={dateRangeSelected === DatePickerRanges.Month}
            onClick={this.handleDateRangeMonth}
          >
            Mes actual
          </HeaderOption>
          <HeaderOption
            selected={dateRangeSelected === DatePickerRanges.Year}
            onClick={this.handleDateRangeYear}
          >
            Año actual
          </HeaderOption>
        </Header>
        {dateRangeSelected !== DatePickerRanges.Today &&
          dateRangeSelected !== DatePickerRanges.RealTime && (
            <React.Fragment>
              <CalendarsContainer>
                <div onMouseEnter={this.handleMouseEnterStart}>
                  <MonthPicker
                    index={0}
                    month={startMonth}
                    year={startYear}
                    onChange={this.handleChangeHeader}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                  {this.renderWeekDays()}
                  <ReactDatePicker
                    onChange={(dates: any) =>
                      this.handleCalendarDateChange(dates)
                    }
                    focusSelectedMonth
                    selected={selectedStart}
                    startDate={startDate}
                    endDate={endDate || temporalEndDate}
                    locale="es"
                    selectsRange
                    inline
                    minDate={minDate}
                    maxDate={maxDate || new Date()}
                    disabledKeyboardNavigation
                    renderCustomHeader={this.renderEmptyHeader}
                  />
                </div>
                <div onMouseEnter={this.handleMouseEnterEnd}>
                  <MonthPicker
                    index={1}
                    month={endMonth}
                    year={endYear}
                    onChange={this.handleChangeHeader}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                  {this.renderWeekDays()}
                  <ReactDatePicker
                    onChange={(dates: any) =>
                      this.handleCalendarDateChange(dates)
                    }
                    focusSelectedMonth
                    selected={selectedEnd}
                    startDate={startDate}
                    endDate={endDate}
                    locale="es"
                    selectsRange
                    inline
                    minDate={minDate}
                    maxDate={maxDate || new Date()}
                    disabledKeyboardNavigation
                    renderCustomHeader={this.renderEmptyHeader}
                  />
                </div>
              </CalendarsContainer>
              {!hideTimeSelector && (
                <TimePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={this.handleTimeChange}
                />
              )}
            </React.Fragment>
          )}
        {(dateRangeSelected === DatePickerRanges.Today ||
          dateRangeSelected === DatePickerRanges.RealTime) &&
          !hideTimeSelector && (
            <TodayPicker
              realTimeAvailable={!!realTimeAvailable}
              realTimePeriod={realTimePeriod}
              dateRangeSelected={dateRangeSelected}
              onRealTimeRangeSelected={this.handleRealTimeRangeSelected}
              onTodayChange={this.handleTodayChange}
              startDate={startDate}
              endDate={endDate}
              onTimeChange={this.handleTimeChange}
            />
          )}
        <ApplyContainer>
          {(!startDate || !endDate) && (
            <ExplainText>Selecciona una fecha de inicio y de fin</ExplainText>
          )}
          <Button
            type={ButtonTypes.SUCCESS}
            text="Aplicar"
            onClick={this.handleApplyChanges}
            disabled={!startDate || !endDate}
          />
        </ApplyContainer>
      </DatePickerContainer>
    )
  }
}

export default DatePicker

// //
// Styles
// //

const DatePickerContainer = styled.div`
  width: 660px;
  background: white;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
  position: relative;
`

const Header = styled.div`
  width: 100%;
  height: 53px;
  border-bottom: 1px solid ${Colors.cloudy};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  box-sizing: border-box;
`

export const Label = styled.div`
  color: ${Colors.normal_gray};
  font-weight: 600;
  font-size: 14px;
  font-family: 'Source Sans Pro';
`

export const Text = styled.div`
  color: ${Colors.normal_gray};
  font-size: 14px;
  text-transform: capitalize;
  margin: 0px 10px;
`

export const HeaderOption = styled.div<{
  selected?: boolean
}>`
  display: flex;
  align-items: center;
  height: 28px;
  background: ${props =>
    props.selected ? Colors.blue_ocean : Colors.fog_gray};
  color: ${props => (props.selected ? Colors.white : Colors.normal_gray)};
  padding: 3px 10px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
`

const CalendarsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 1px solid ${Colors.cloudy};

  & > div {
    width: 50%;
  }
  .react-datepicker {
    width: 100%;
    border: none;
    display: flex;
    margin-bottom: 10px;

    /* **
    ** Days
    ** */
    .react-datepicker__day {
      color: ${Colors.normal_gray};
      width: 42px;
      height: 36px;
      margin: 0px;
      border-radius: 0px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-color: transparent !important;
      background-color: transparent;
      outline: none;

      &.react-datepicker__day--selected {
        border: transparent !important;
      }

      &.react-datepicker__day--outside-month {
        visibility: hidden;
      }

      &.react-datepicker__day--in-range,
      &.react-datepicker__day--in-selecting-range {
        color: white;
        background-color: ${Colors.normal_gray};

        &.react-datepicker__day--range-start,
        &.react-datepicker__day--range-end,
        &.react-datepicker__day--selecting-range-start,
        &.react-datepicker__day--selecting-range-end {
          background-color: ${Colors.gray_icon};
        }
      }

      &.react-datepicker__day--disabled {
        color: ${Colors.cloudy};
        cursor: not-allowed;
      }
    }

    .react-datepicker__day--today {
      color: ${Colors.blue_ocean};
    }

    .react-datepicker__month-container {
      width: 100%;
      float: none;
      display: flex;
      flex-direction: column;
      padding: 0px 7.5px;
      box-sizing: border-box;

      .react-datepicker__month {
        margin: 0px;
      }
    }

    .react-datepicker__month-container:nth-child(3) {
      margin-top: 82px;
    }

    .react-datepicker__header--custom {
      display: none;
    }
  }
`

const ApplyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 30px;
  box-sizing: border-box;
  position: relative;
`

const WeekDaysContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -10px;
`

const WeekDay = styled.div`
  width: 42px;
  font-size: 12px;
  height: 40px;
  font-weight: 600;
  color: ${Colors.light_gray};
  display: flex;
  align-items: center;
  justify-content: center;
`
const ExplainText = styled.div`
  position: absolute;
  align-items: center;
  left: 0px;
  padding-left: 2em;
  height: 100%;
  display: flex;
  justify-content: center;
  color: ${Colors.light_gray};
`
