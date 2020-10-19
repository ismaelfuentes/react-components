// Libs
import * as React from 'react'
import styled from 'styled-components'
import { fill } from 'lodash'
import { defaultTo,  noop } from 'lodash/fp'

// Components
import Row from './Row'
import ExpandedRow from './ExpandedRow'

// Types
import { Option } from '../form/select/Select'

// Styles
import colors from '../styles/colors.json'
import { IconColors } from '../icon/Icon'

export enum ColumnTypes {
  TEXT,
  NUMBER,
  DATE,
  SHORTDATE,
  ACTIONS,
  SELECT,
  BOOLEAN,
  EXPANDABLE_TEXT,
  MULTISELECT,
}

interface SelectProps {
  // Options of the select
  options: Option[]

  // Callback when the user change the value
  onChange: () => {}

  // The select can be empty or not
  showEmpty: boolean
}

// Types
export interface FlagProps {
  // Field of the data to check
  field: string
  // Value of the field that mark the flag as active
  value: string
  // Style of the active flag
  style?: string
}

interface Action {
  name?: string
  callback: (data: any, index?: number) => void
  icon?: string
  iconColor?: IconColors
  // The element is an html element to display instead of an icon
  element?: any
  // Condition to show the action or not
  condition?: (data: any) => void
  // Show a tooltip with this text when mouse over
  tooltip?: string
}

export type TableColumn = {
  title?: string

  // Field of each data row to display
  field?: string

  // the syntax for the link using the fileds must by writing the fields between dollars:
  // /admin/client/$id/user/$userId$
  linkTo?: string

  // type of column to display on thing or another
  type?: ColumnTypes

  // Possible actions to show
  actions?: Action[]
  checkActionsAllowed?: boolean

  // specific config for each type of column
  config?: SelectProps | any

  // column size relative to flex width
  weight?: number

  // Flags of the column cells
  flags?: FlagProps[]
  // only one flag can be active at once
  uniqueFlag?: boolean

  // Is the table sortable by this column
  sortable?: boolean

  // Clickable column
  clickable?: boolean
  onClick?: (row: any) => {}
}

// State and props
interface Props {
  columns: TableColumn[]

  // array of rows to display
  rows?: any[]

  // Show or hide the headers of the columns
  columnHeaders?: boolean

  // category selector as a new expandable row
  extraField?: boolean
  extraFieldOptions?: any[]
  onExtraFieldChange?: any

  // Center text
  centerText?: boolean

  // table with border
  border?: boolean

  // The table data can be edited inline
  editable?: boolean
  onEdit?: (rowNumber: number, field: string, value: any) => void

  // Sorting parameters that specify the column being ordered and the order
  sortingColumn?: string
  sortingOrder?: number
  // Cb when te user clicks on the column header
  onUserSorts?: (name: string, order: number) => {}

  // The table has a max height with scroll
  scrollable?: boolean
}

interface State {
  first: number
  after: number
  filter: string
  nameFiltering?: string
  expandedRows?: boolean[] | null
  rows?: any[]
}

// //
// Component
// //
class TableComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      first: 50,
      after: 0,
      filter: '',
      nameFiltering: undefined,
      expandedRows: props.extraField
        ? fill([defaultTo(props.rows?.length, 0)], false)
        : null,
    }
  }

  handleInputChange = (rowNumber: number, field: string, value: any) => {
    this.props.onEdit && this.props.onEdit(rowNumber, field, value)
  }

  handleGoForward = () => {
    this.setState({
      after: this.state.after + this.state.first,
    })
  }

  handleGoBackward = () => {
    this.setState({
      after: this.state.after - this.state.first,
    })
  }

  renderColumnHeaders = (columns: TableColumn[]) => {
    const headers: React.ReactNode[] = []

    if (this.props.extraField) {
      headers.push(<ExpandHeader key="expandIcon" />)
    }
    const onUserClick = (col: TableColumn) => {
      let newOrder = 1

      if (this.props.sortingColumn === col.title) {
        newOrder = this.props.sortingOrder === 1 ? -1 : 1
      }

      if (this.props.onUserSorts) {
        this.props.onUserSorts(col.title || '', newOrder)
      }
    }

    columns.forEach(col => {
      const sortOrder =
        this.props.sortingColumn === col.title ? this.props.sortingOrder : 0

      headers.push(
        <Column
          key={col.title}
          weight={col.weight}
          centerText={!!this.props.centerText}
          sortable={col.sortable}
          onClick={() => onUserClick(col)}
        >
          {col.title} {col.sortable && <SortMark order={sortOrder}>›</SortMark>}
        </Column>
      )
    })

    return (
      <ColumnsContainer>
        <HeaderRow centerText={this.props.centerText}>{headers}</HeaderRow>
      </ColumnsContainer>
    )
  }

  // TODO: remove this method since categories shouldnt have anything to do with Table component 

  // onCategoriesChange = (index: number, row: any, value: any[]) => {
  //   this.props.onExtraFieldChange(row, value);
  //   const newRows = this.state.rows?.slice();

  //   if (newRows && newRows[index].categories) {
  //     newRows[index].categories = value;
  //   }

  //   this.setState({
  //     rows: newRows,
  //   });
  // }

  renderTable = (
    columns: TableColumn[],
    rows: any,
    columnHeaders: boolean,
    scrollable: boolean
  ) => {
    return (
      <Table border={!!this.props.border}>
        {columnHeaders && this.renderColumnHeaders(columns)}

        <RowsContainer scrollable={scrollable}>
          {rows.map((row: any, index: number) => {
            return (
              <React.Fragment key={'row_' + index}>
                <Row
                  key={'row_' + index}
                  columns={columns}
                  data={row}
                  index={index}
                  expandable={this.props.extraField}
                  onExpandClick={this.expandRow}
                  centerText={this.props.centerText}
                  editable={this.props.editable}
                  onEdit={this.handleInputChange.bind(this, index)}
                />

                {this.state.expandedRows && this.state.expandedRows[index] && (
                  <ExpandedRow
                    index={index}
                    columns={columns}
                    row={row}
                    onCategoriesChange={noop}
                    selectOptions={this.props.extraFieldOptions || []}
                  />
                )}
              </React.Fragment>
            )
          })}
        </RowsContainer>
      </Table>
    )
  }

  expandRow = (index: number) => {
    const newExpandedRows = this.state.expandedRows?.slice()

    if (newExpandedRows) {
      newExpandedRows[index] = !newExpandedRows[index]
    }

    this.setState({
      expandedRows: newExpandedRows,
    })
  }

  render() {
    const {
      columns,
      columnHeaders = true,
      rows,
      scrollable = false,
    } = this.props

    return (
      <TableContainer>
        {rows && this.renderTable(columns, rows, columnHeaders, scrollable)}
      </TableContainer>
    )
  }
}

export default TableComponent

// //
// Styles
// //

const ExpandHeader = styled.th`
  width: 27px;
`

const Table = styled.table<{ border?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  word-break: break-word;
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(0, 82, 163, 0.06);
  border-collapse: collapse;

  ${({ border = false }) =>
    border &&
    `th, td {
      border: 1px solid rgb(242, 244, 247);
    }`}
`

const RowsContainer = styled.tbody<{ scrollable?: boolean }>`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  ${props =>
    props.scrollable &&
    `
  max-height: 450px;
  overflow: auto;
  `}
`

const TableContainer = styled.div`
  width: 100%;
`

const ColumnsContainer = styled.thead`
  display: flex;
  width: 100%;
`

const Column = styled.th<{
  weight?: number
  centerText?: boolean
  sortable?: boolean
}>`
  display: flex;
  flex-grow: ${({ weight = 1 }) => weight};
  flex-basis: 0;
  justify-content: ${({ centerText = false }) =>
    centerText ? 'center' : 'flex-start'};
  align-items: center;
  height: 50px;
  font-weight: 600;
  color: ${colors.dark_gray};
  font-size: 14px;
  overflow: hidden;
  ${({ sortable }) => sortable && 'cursor: pointer;'};
`

const HeaderRow = styled.tr<{ centerText?: boolean }>`
  display: flex;
  width: 100%;
  ${({ centerText = false }) => (!centerText ? 'padding: 0 20px' : '')}
`

const SortMark = styled.div<{ order?: number }>`
  margin-left: 8px;
  margin-top: 0px;
  transform: ${({ order = 0 }) =>
    order === -1
      ? 'rotate(-90deg); margin-left: 6px;'
      : order === 1
      ? 'rotate(90deg);'
      : 'rotate(0deg); margin-top: -2px;'};
  font-size: 20px;
`
