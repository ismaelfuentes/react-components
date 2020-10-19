import React, { Component } from 'react'

import {
  GridContainer,
  GridRow,
  GridSizes,
  HeadLine,
  Text,
  Table,
  ColumnTypes,
  Icons,
  IconColors,
  AbbreviatedText,
} from 'react-components'

export default class TabBarSample extends Component {
  state = {
    sortedColumn: undefined,
    sortOrder: 0,
  }

  columns = [
    {
      title: 'Nombre',
      field: 'name',
      weight: 3,
      type: ColumnTypes.TEXT,
      sortable: true,
      clickable: true,
      onClick: data => {
        console.log(data)
      },
    },
    {
      title: 'Descripción',
      field: 'description',
      weight: 10,
      type: ColumnTypes.TEXT,
      sortable: true,
    },
    {
      title: 'Fecha',
      field: 'date',
      weight: 2,
      type: ColumnTypes.SHORTDATE,
    },
    {
      title: 'Acciones',
      weight: 5,
      type: ColumnTypes.ACTIONS,
      actions: [
        {
          icon: Icons.Edit,
          name: 'Editar',
          callback: () => {
            alert('Edit')
          },
        },
        {
          icon: Icons.Remove,
          name: 'Borrar',
          iconColor: IconColors.Negative,
          callback: row => {
            alert('Remove ' + row.name)
          },
        },
        {
          icon: Icons.Add,
          name: 'Añadir',
          iconColor: IconColors.Negative,
          callback: row => {
            alert('Remove ' + row.name)
          },
        },
      ],
    },
  ]
  rows = [
    {
      name:
        'MarianoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campoY en el campo',
      description: 'Me llamo',
      date: '2019-12-16T00:00:00.000+0000',
    },
    {
      name: 'Y en el campo',
      description: 'Eres mi hermano',
    },
  ]

  handleColumnSort = (columnName, order) => {
    this.setState({
      sortedColumn: columnName,
      sortOrder: order,
    })
  }

  render() {
    return (
      <GridContainer separated="big">
        <GridRow size={GridSizes.FULL}>
          <HeadLine>Table</HeadLine>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Text>
            Las tablas pueden ser de diversas maneras e incluso con botones de
            acción
          </Text>
        </GridRow>
        <GridRow size={GridSizes.FULL}>
          <Table
            columns={this.columns}
            rows={this.rows}
            onUserSorts={this.handleColumnSort}
            sortingColumn={this.state.sortedColumn}
            sortingOrder={this.state.sortOrder}
          />
        </GridRow>
        <GridRow size={GridSizes.SIXTH}>
          <AbbreviatedText>
            Las tablas pueden ser de diversas maneras e incluso con botones de
            acción
          </AbbreviatedText>
        </GridRow>
      </GridContainer>
    )
  }
}
