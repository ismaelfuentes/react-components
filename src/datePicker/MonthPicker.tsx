// Libs
import * as React from 'react'
import styled from 'styled-components'
import { endOfMonth, startOfMonth } from 'date-fns'

// Components
import Select from '../form/select/Select'

// Props
interface Props {
  index: number
  month: number
  year: number
  onChange: Function
  minDate?: Date
  maxDate?: Date
}

// //
// Component
// //
export default function MonthPicker({
  index,
  month,
  year,
  onChange,
  minDate,
  maxDate,
}: Props) {
  const years = getAvailableYears(minDate, maxDate)
  const months = getAvailableMonths(year, minDate, maxDate)

  return (
    <Header>
      <OneMonthContainer>
        <MonthSelectorContainer>
          <Select
            id="months"
            key={`months_${months[month].value}_${months.length}`}
            smallSize
            value={months[month]}
            onChange={(_id, value) => {
              onChange(index, parseInt(value.value), year)
            }}
            options={months}
          />
        </MonthSelectorContainer>
        <YearSelectorContainer>
          <Select
            id="years"
            key={`years_${year}__${years.length}`}
            smallSize
            value={year.toString()}
            onChange={(_id, value) => {
              onChange(index, month, parseInt(value.value))
            }}
            options={years}
          />
        </YearSelectorContainer>
      </OneMonthContainer>
    </Header>
  )
}

// //
// Aux functions
// //
function getAvailableMonths(
  year: number,
  minDate?: Date,
  maxDate: Date = new Date()
) {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]
  const list = []
  let m = 0
  const date = new Date()

  date.setFullYear(year)
  while (m < months.length) {
    date.setMonth(m)

    if (
      (!minDate || minDate <= endOfMonth(date)) &&
      maxDate >= startOfMonth(date)
    ) {
      list.push({
        value: m,
        label: months[m],
      })
    }
    m++
  }

  return list
}

function getAvailableYears(minDate?: Date, maxDate?: Date) {
  // From the more recent to the older
  const from = new Date().getFullYear()
  const to = from - 20
  const list = []
  let f = from
  const realMin = minDate ? minDate.getFullYear() : to
  const realMax = maxDate ? maxDate.getFullYear() : from

  while (f > to && f >= realMin) {
    if (f <= realMax) {
      list.push(f.toString())
    }
    f--
  }

  return list
}

// //
// Styles
// //
const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 15px;
  padding-bottom: 0px;
  box-sizing: border-box;
`

const OneMonthContainer = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
`

const MonthSelectorContainer = styled.div`
  width: calc(70% - 10px);
  margin-right: 10px;
`

const YearSelectorContainer = styled.div`
  width: 30%;
`
