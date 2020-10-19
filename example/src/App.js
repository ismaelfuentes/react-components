import React from 'react'

import {
  GridContainer,
  GridRow,
  GridSizes,
  Colors,
  HeadLine,
} from 'react-components'

// Samples
import ButtonSample from './samples/button.sample'
import FormSample from './samples/form.sample'
import MultiFilterSample from './samples/multifilter.sample'
import TabBarSample from './samples/tabBar.sample'
import TableSample from './samples/table.sample'
import TagSample from './samples/tag.sample'
import DatePickerSample from './samples/datePicker.sample'

export const App = () => {
  return (
    <div
      style={{
        width: '86%',
        marginLeft: '7%',
        padding: '50px',
        backgroundColor: 'white',
        boxShadow: `0px 0px 7px -3px ${Colors.dark_gray}`,
        boxSizing: 'border-box',
      }}
    >
      <GridContainer separated="big">
        <GridRow size={GridSizes.FULL}>
          <HeadLine style={{ fontSize: '40px' }}>react Components</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <DatePickerSample />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <TagSample />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <ButtonSample />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <FormSample />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <TabBarSample />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <MultiFilterSample />
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <TableSample />
        </GridRow>
      </GridContainer>
    </div>
  )
}

// //
// Styles
// //
