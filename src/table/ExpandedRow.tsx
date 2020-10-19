// Libs
import React from 'react'
import styled from 'styled-components'
import ReactSelect from 'react-select'

// Components
// import Field from '@src/components/FilterForm/Field'

// Types
import { TableColumn } from './Table'

// Styles
import colors from '../styles/colors.json'

// State & props
interface Props {
  // Row index
  index: number;
  // Columns definition
  columns: TableColumn[];
  // Actual row data
  row: any;
  // Callback when the multiselect changes
  onCategoriesChange: (index: number, row: any, categories: any[]) => void;
  // Options for the multiselect
  selectOptions: any[];
}

function ExpandedRowComponent(props: Props) {
  const { index, columns, row, onCategoriesChange, selectOptions } = props

  const allCategories = [
    {
      label: 'Todas las categorías compartidas',
      value: 'allCategories'
    }
  ]

  return (
    <ExpandedRow dark={index % 2 === 0}>
      <td />
      <ExpandedCell colSpan={columns.length}>
        {/* <Field> */}
        <ReactSelect
          value={row.categories.length ? row.categories : allCategories}
          placeholder="Selecciona las categorías a compartir"
          name="categories"
          id="categories"
          onChange={(categories: any) => {
            onCategoriesChange(index, row, cleanCategories(categories))
          }}
          options={selectOptions}
          backspaceToRemoveMessage=""
          multi
        />
        {/* </Field> */}
        <Link
          onClick={() => {
            onCategoriesChange(index, row, [])
          }}
        >
          Seleccionar todas las categorías
        </Link>
      </ExpandedCell>
    </ExpandedRow>
  )
}

export default ExpandedRowComponent
// //
// Private functions
// //
function cleanCategories(categories: any[]) {
  return categories.filter(cat => cat.value !== 'allCategories')
}

// //
// Styles
// //
const ExpandedRow = styled.tr<{ dark?: boolean }>`
  ${props => props.dark && `background-color: ${colors.cloudy};`}
`

const ExpandedCell = styled.td`
  padding-right: 2em;
  padding-top: 0.5em;
  padding-bottom: 5px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;

  & > .Field {
    margin-bottom: 5px;
  }
`

const Link = styled.a``
