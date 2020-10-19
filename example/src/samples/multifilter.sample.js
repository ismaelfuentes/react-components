import React, { Component } from 'react'

import {
  MultiFilter,
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
} from 'react-components'

export default class TabBarSample extends Component {
  options = [
    {
      value: 'name',
      label: 'Nombre de usuario',
    },
    {
      value: 'id',
      label: 'Identificador de usuario',
    },
    {
      value: 'email',
      label: 'Correo electrónico',
    },
  ]

  handleApplyFilters(filters) {
    console.log(filters)
  }

  render() {
    return (
      <GridContainer separated="big">
        <GridRow size={GridSizes.FULL}>
          <HeadLine>MultiFilter</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>
            When multiple fileds need to be applied with different keys and
            different values
          </Text>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <MultiFilter
            onApplyFilters={this.handleApplyFilters}
            options={this.options}
          />
        </GridRow>
      </GridContainer>
    )
  }
}
