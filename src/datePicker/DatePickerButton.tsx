// Libs
import React from 'react'
import styled from 'styled-components'
import es from 'date-fns/locale/es'
import { format } from 'date-fns'
import { noop } from 'lodash'

// Components
import { default as Icon, Icons, IconColors } from '../icon/Icon'
import DatePicker, {
  DatePickerRanges,
  DatePickerRealTimes,
  DatePickerProps,
} from './DatePicker'

// Props
interface Props extends DatePickerProps {
  isRealTime?: boolean
  onClickRealTime?: Function
  disabled?: boolean
}

interface State {
  showDatePicker: boolean
  startDate: Date
  endDate?: Date
  dateRange: DatePickerRanges
  realTimePeriod: DatePickerRealTimes
}

const RealTimeTexts = {
  [DatePickerRealTimes.Thirty]: 'Última media hora',
  [DatePickerRealTimes.Sixty]: 'Última hora',
  [DatePickerRealTimes.Ninety]: 'Última hora y media',
}

// Component
class DatePickerButton extends React.PureComponent<Props, State> {
  static defaultProps = {
    isRealTime: false,
    onClickRealTime: noop,
    disabled: false,
  }

  state = {
    showDatePicker: false,
    startDate: new Date(),
    endDate: new Date(),
    dateRange: DatePickerRanges.Custom,
    realTimePeriod: DatePickerRealTimes.None,
  }

  constructor(props: Props) {
    super(props)
    this.state.startDate = props.startDate || this.state.startDate
    this.state.endDate = props.endDate || this.state.endDate

    if (props.isRealTime) {
      this.state.dateRange = DatePickerRanges.RealTime
    }
  }

  handleDateChange = (data: any) => {
    const startDate = new Date(data.startDate)
    const endDate = data.endDate && new Date(data.endDate)
    const dataChange: any = {
      startDate,
      endDate,
      dateRange: data.dateRange,
      realTimePeriod: data.realTimePeriod,
    }

    this.setState({
      showDatePicker: false,
      ...dataChange,
    })

    if (this.props.onChange) {
      this.props.onChange(dataChange)
    }

    if (
      data.dateRange === DatePickerRanges.RealTime &&
      this.props.onClickRealTime
    ) {
      this.props.onClickRealTime(data.realTimePeriod)
    }
  }

  handleClickButton = () => {
    if (!this.props.disabled) {
      this.setState(state => ({ showDatePicker: !state.showDatePicker }))
    }
  }

  render() {
    const {
      startDate,
      endDate,
      showDatePicker,
      dateRange,
      realTimePeriod,
    } = this.state
    const {
      realTimeAvailable,
      hideTimeSelector,
      hideTodayOption,
      minDate,
      maxDate,
      disabled,
      realTimePeriod: realTimePeriodProp,
    } = this.props
    const displayTime =
      format(startDate, 'HH:mm', { locale: es }) !== '00:00' ||
      format(endDate || new Date(), 'HH:mm', { locale: es }) !== '23:59'
    const displaySecondDate =
      displayTime ||
      format(startDate, 'd/MM/yyyy', { locale: es }) !==
        format(endDate || new Date(), 'd/MM/yyyy', { locale: es })

    return (
      <Container>
        <ButtonContainer onClick={this.handleClickButton} disabled={!!disabled}>
          {dateRange === DatePickerRanges.RealTime ? (
            <React.Fragment>
              <Icon icon={Icons.Pulse} />
              <RealTimeText>
                {RealTimeTexts[realTimePeriodProp || realTimePeriod]}
              </RealTimeText>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Icon icon={Icons.Calendar} color={IconColors.White} />
              <DateContainer>
                <DateText>
                  {format(startDate, 'd/MM/yyyy', { locale: es })}
                </DateText>
                {!hideTimeSelector && displayTime && (
                  <TimeText>
                    {format(startDate, 'HH:mm', { locale: es })}
                  </TimeText>
                )}
                {displaySecondDate && (
                  <React.Fragment>
                    <DateText>-</DateText>
                    <DateText>
                      {format(endDate || new Date(), 'd/MM/yyyy', {
                        locale: es,
                      })}
                    </DateText>
                    {!hideTimeSelector && displayTime && (
                      <TimeText>
                        {format(endDate || new Date(), 'HH:mm', { locale: es })}
                      </TimeText>
                    )}
                  </React.Fragment>
                )}
              </DateContainer>
            </React.Fragment>
          )}

          <ExpandIconContainer>
            <Icon icon={Icons.DownArrow} color={IconColors.White} />
          </ExpandIconContainer>
        </ButtonContainer>
        {showDatePicker && (
          <DatePickerContainer>
            <DatePicker
              onChange={this.handleDateChange}
              startDate={startDate}
              endDate={endDate}
              dateRange={dateRange}
              realTimePeriod={realTimePeriod}
              realTimeAvailable={realTimeAvailable}
              hideTimeSelector={hideTimeSelector}
              hideTodayOption={hideTodayOption}
              minDate={minDate}
              maxDate={maxDate}
            />
          </DatePickerContainer>
        )}
      </Container>
    )
  }
}

export default DatePickerButton

// //
// Styles
// //
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ButtonContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0px 25px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${props => (props.disabled ? 'rgba(255,255,255,0.4)' : 'white')};
`

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  align-items: baseline;
`

const DateText = styled.div`
  margin-right: 10px;
  font-size: 15px;
  font-weight: 600;
`

const TimeText = styled.div`
  margin-right: 10px;
  font-size: 13px;
`

const ExpandIconContainer = styled.div`
  position: absolute;
  right: 25px;
`

const DatePickerContainer = styled.div`
  width: 660px;
  position: absolute;
  right: 0px;
  top: 64px;
`

const RealTimeText = styled.div`
  display: inline-block;
  margin-left: 20px;
  font-weight: 600;
  color: white;
`
