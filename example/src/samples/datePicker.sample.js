import React from 'react'
import styled from 'styled-components'

import {
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
  DatePickerButton,
  Colors,
  InfoBox,
} from 'react-components'

function DatePickerSample() {
  const start = new Date()
  const end = new Date()
  start.setDate(2)
  start.setMonth(2)
  end.setMonth(2)
  const minDate = new Date()
  minDate.setFullYear(2015)

  return (
    <GridContainer separated="big">
      <GridRow size={GridSizes.FULL}>
        <HeadLine>Date Picker & Infobox</HeadLine>
      </GridRow>
      <GridRow size={GridSizes.THIRD}>
        <Text>Info box, click it!</Text>
      </GridRow>
      <GridRow size={GridSizes.THIRD}>
        <Text>Date picker</Text>
      </GridRow>
      <GridRow size={GridSizes.THIRD} newLine>
        <InfoBox
          title="¿Has pensado en dejar de fumar?"
          text="Nunca dejes de fumar por mucho que te lo digan los demás, fumar es la ostia y siempre lo será, no hagas caso jamás."
        />
      </GridRow>
      <GridRow size={GridSizes.THIRD}>
        <DateContainer>
          <DatePickerButton startDate={start} endDate={end} minDate={minDate} />
        </DateContainer>
      </GridRow>
    </GridContainer>
  )
}

export default DatePickerSample

// //
// Styles
// //
const DateContainer = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.blue_sea};
`
