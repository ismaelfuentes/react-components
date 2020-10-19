// Libs
import * as React from 'react'
// import { Link } from "react-router-dom";
import styled from 'styled-components'
import { get, noop } from 'lodash/fp'
import { defaultTo } from 'lodash'
import { format as dateFnsFormat } from 'date-fns'

// Components
import { ReactComponent as Caret } from './caret.svg'
import Select from '../form/select/Select'
import Input from '../form/input/Input'
import FlagContainer from './flag/FlagContainer'
import { default as Icon, IconColors } from '../icon/Icon'
import AbbreviatedText from '../abbreviatedText/AbbreviatedText'

// Types
import { TableColumn, ColumnTypes, FlagProps } from './Table'

// Styles
import colors from '../styles/colors.json'

// //
// Aux functions
// //
function formatNumber(number: number, options = {}) {
  const opt = Object.assign(
    {
      shorten: false,
      decimals: undefined,
    },
    options,
  )

  // First ensure that we actually have a number
  const n = Number(number)

  if (Number.isNaN(n)) {
    // eslint-disable-next-line
    console.warn('formatNumber was called with a non-number:', n)

    return n
  }

  // Shorten the number
  if (n >= 1000 && opt.shorten) {
    return ['k', 'M', 'B'].reduceRight((acc: string | number, key, index) => {
      // When the accumulator is astring, we are done
      if (typeof acc === 'string') {
        return acc
      }

      const target = 1000 ** (index + 1)

      // The number is too small for this key, move to alower one
      if (acc < target) {
        return acc
      }

      // Nailed it
      const res = acc / target
      //return `${roundAt(res, 1)}${key}`;

      return `${Math.round(res)}${key}`
    }, n)
  }

  let decimals: number | undefined = opt?.decimals

  // Deice the decimals based on the number when not specified
  if (!decimals) {
    if (n < 1) {
      decimals = 3
    } else if (n < 10) {
      decimals = 1
    } else {
      decimals = 0
    }
  }

  // Format using the standard library
  return n.toLocaleString('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}

// State and props
interface Props {
  // Definition of table columns
  columns: TableColumn[]
  // Row of data to show
  data: any
  // Row number
  index: number
  // The row can be expandRouteComponentPropsed or not
  expandable?: boolean
  // If the row is expandable, callback when the user expands it
  onExpandClick: (index: number) => void
  // Center the text in the cell
  centerText?: boolean
  // The cells have to be inputs
  editable?: boolean
  onEdit?: (field: string, value: any) => void
}

interface State {
  expanded: boolean
}
// //
// Component
// //
class RowComponent extends React.PureComponent<Props, State> {
  state: State = {
    expanded: false,
  }

  handleFlagEdit = (field: string, value: string, active: boolean) => {
    this.props.onEdit && this.props.onEdit(field, !active ? value : null)
  }

  renderEditableCell = (col: TableColumn): React.ReactNode => {
    switch (col && col.type) {
      case ColumnTypes.BOOLEAN:
        return (
          <Input
            type="checkbox"
            id={defaultTo(col.field, 'none')}
            value={!!get(defaultTo(col.field, 'none'), this.props.data)}
            onChange={(id, value) => this.props.onEdit && this.props.onEdit(id, value)}
          />
        )

      case ColumnTypes.EXPANDABLE_TEXT: {
        const expandElement = (element: HTMLTextAreaElement | null) => {
          if (!element) {
            return null
          }

          element.style.height = 'auto'
          element.style.padding = '0'
          // for box-sizing other than "content-box" use:
          // el.style.cssText = '-moz-box-sizing:content-box';
          element.style.height = element.scrollHeight + 'px'

          return this.props.onEdit && this.props.onEdit(defaultTo(col?.field, 'none'), element.value)
        }

        return (
          <div className="react-input" style={{ width: '100%' }}>
            <TableTextarea
              className="react-input_text"
              defaultValue={get(defaultTo(col?.field, 'none'), this.props.data)}
              ref={input => {
                expandElement(input)
              }}
              onChange={event => {
                expandElement(event.target)
              }}
            />
          </div>
        )
      }
      case ColumnTypes.NUMBER:
        return (
          <TableInput
            type="number"
            defaultValue={get(defaultTo(col?.field, 'none'), this.props.data)}
            onChange={event =>
              this.props.onEdit && this.props.onEdit(defaultTo(col?.field, 'none'), event.target.value)
            }
          />
        )

      default:
        return (
          <TableInput
            type="text"
            defaultValue={get(defaultTo(col.field, 'none'), this.props.data)}
            onChange={event => this.props.onEdit && this.props.onEdit(defaultTo(col.field, 'none'), event.target.value)}
          />
        )
    }
  }

  private renderSelectColumn = (column: any, data: any, index: number, multi = false) => {
    const onChange = column.config.onChange ? column.config.onChange.bind(null, data, index) : noop

    return (
      <Cell key={column.field} weight={column.weight} centerText={!!this.props.centerText}>
        {column.flags && this.renderFlags(column.flags, data, column.uniqueFlag)}
        {(!data || !get(column.field, data)) && !this.props.editable ? (
          <></>
        ) : (
            <SelectContainer>
              <Select
                id={column.field}
                onChange={onChange}
                value={get(column.field, data)}
                options={column.config.options || []}
                showEmpty={!!column.config.showEmpty}
                transparentInput={true}
                multi={multi}
              />
            </SelectContainer>
          )}
      </Cell>
    )
  }

  private renderActionsColumn = (column: TableColumn, data: any, index: number) => {
    const actions: any[] = []

    if (!column.checkActionsAllowed || data.actionsAllowed) {
      column.actions?.forEach((action: any) => {
        if (!action.condition || action.condition(data) === true) {
          actions.push(
            <ActionButton key={action.name} onClick={() => action.callback(data, index)}>
              {action.icon ? (
                <Icon icon={action.icon} color={action.iconColor || IconColors.Positive} />
              ) : (
                  action.element || action.name
                )}
              {action.tooltip && <div className="actionbutton_tooltip">{action.tooltip}</div>}
            </ActionButton>,
          )
        }
      })
    }

    return (
      <Cell key={column.field + '_' + index.toString()} weight={column.weight} centerText={!!this.props.centerText}>
        <ActionsColumn key={column.field}>{actions}</ActionsColumn>
      </Cell>
    )
  }

  private renderExpandCell = (expanded: boolean, index: number, onClick: (index: number) => void) => {
    return (
      <ExpandCell
        onClick={() => {
          this.setState({ expanded: !expanded })
          onClick(index)
        }}
      >
        <ExpandRowIcon expanded={expanded} />
      </ExpandCell>
    )
  }

  private renderFlags = (flags: FlagProps[], data: any, uniqueFlag?: boolean) => {
    return (
      <FlagContainer
        flags={flags}
        data={data}
        editable={!!this.props.editable}
        uniqueFlag={!!uniqueFlag}
        onChange={this.props.onEdit}
      />
    )
  }

  private handleClick = (column: TableColumn) => {
    if (column.onClick) {
      column.onClick(this.props.data)
    }
  }

  private renderCellText = (column: TableColumn, element: React.ReactElement) => {
    if (column.clickable) {
      return (
        <ClickableLink
          onClick={() => {
            this.handleClick(column)
          }}
        >
          {element}
        </ClickableLink>
      )
    } else {
      return <span>{element}</span>
    }
  }

  render() {
    const { columns, data, index, expandable, onExpandClick } = this.props
    const { expanded } = this.state

    const cells: any[] = []

    if (expandable) {
      cells.push(this.renderExpandCell(expanded, index, onExpandClick))
    }

    columns.forEach(col => {
      switch (col.type) {
        case ColumnTypes.DATE:
        case ColumnTypes.SHORTDATE:
          if (!get(defaultTo(col.field, 'none'), data)) {
            cells.push(
              <Cell
                key={col.field + '_' + index.toString()}
                weight={col.weight}
                centerText={!!this.props.centerText}
              ></Cell>,
            )
          } else {
            let date = get(defaultTo(col.field, 'none'), data)

            if (!(date instanceof Date)) {
              date = new Date(date)
            }
            cells.push(
              <Cell key={col.field} weight={col.weight} centerText={!!this.props.centerText}>
                {this.renderCellText(
                  col,
                  printValue(dateFnsFormat(date, col.type === ColumnTypes.DATE ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy')),
                )}
              </Cell>,
            )
          }

          break

        case ColumnTypes.ACTIONS:
          cells.push(this.renderActionsColumn(col, data, index))
          break

        case ColumnTypes.SELECT:
          cells.push(this.renderSelectColumn(col, data, index))
          break

        case ColumnTypes.MULTISELECT:
          cells.push(this.renderSelectColumn(col, data, index, true))
          break

        default:
          if (col.linkTo) {
            cells.push(
              <Cell key={col.field + '_' + index.toString()} weight={col.weight} centerText={!!this.props.centerText}>
                <a href={createLink(data, col.linkTo)}>{printValue(get(defaultTo(col.field, 'none'), data))}</a>
              </Cell>,
            )
          } else {
            cells.push(
              <Cell key={col.field + '_' + index.toString()} weight={col.weight} centerText={!!this.props.centerText}>
                {col.flags && this.renderFlags(col.flags, data, col.uniqueFlag)}
                {this.props.editable ? (
                  this.renderEditableCell(col)
                ) : (
                    <AbbreviatedText>
                      {this.renderCellText(col, printValue(get(defaultTo(col.field, 'none'), data)))}
                    </AbbreviatedText>
                  )}
              </Cell>,
            )
          }
      }
    })

    return <Row centerText={!!this.props.centerText}> {cells}</Row>
  }
}

export default RowComponent

// //
// Aux functions
// //
function createLink(data: any, link: string): string {
  const splited = link.split('$')
  let finalLink = ''

  for (let i = 0; i < splited.length; i++) {
    finalLink += i % 2 === 0 ? splited[i] : data[splited[i]]
  }

  return finalLink
}

function printValue(value: any) {
  if (value === true) {
    return '✔'
  } else if (value === false || value === 'Invalid Date') {
    return ''
  } else if (typeof value === 'number') {
    return formatNumber(value)
  } else if (Array.isArray(value)) {
    return value.join(',')
  } else {
    return value
  }
}

// //
// Styles
// //
const ActionButton = styled.div`
  display: inline-block;
  margin-left: 1.5em;
  cursor: pointer;
  position: relative;

  &:hover {
    & > .actionbutton_tooltip {
      display: block;
    }
  }

  & > .actionbutton_tooltip {
    display: none;
    position: absolute;
    background: #5f697a;
    color: white;
    padding: 3px 7px;
    top: -25px;
    right: 0px;
    border-radius: 3px;
    font-weight: bold;
  }
`

const ActionsColumn = styled.div`
  white-space: nowrap;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const ExpandCell = styled.td`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: -3px;
  margin-right: 22px;
`

const ExpandRowIcon = styled(Caret) <{ expanded: boolean }>`
  vertical-align: middle;
  color: ${colors.light_gray};
  transform: rotate(${props => (props.expanded ? '0deg' : '-90deg')});
`

const SelectContainer = styled.div`
  width: 100%;
  & > .react-input {
    margin: 0px;
  }
`

const Row = styled.tr<{ centerText?: boolean }>`
  :nth-child(odd) {
    background-color: ${colors.cloudy};
  }
  background-color: ${colors.white};
  display: flex;
  width: 100%;
  ${({ centerText = false }) => (!centerText ? 'padding: 0 20px' : '')}
  box-sizing: border-box;
`

const Cell = styled.td<{ weight?: number; centerText?: boolean }>`
  display: flex;
  min-height: 50px;
  flex-grow: ${({ weight = 1 }) => weight};
  color: ${colors.dark_gray};
  font-size: 14px;
  justify-content: ${({ centerText = false }) => (centerText ? 'center' : 'flex-start')};
  align-items: center;
  flex-basis: 0;
  min-width: 0;
  position: relative;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    & .editable-flag {
      opacity: 1;
    }
  }
`

const TableInput = styled.input`
  border: none;
  background: none;
  width: 100%;
  padding: 2px;
  text-align: center;
  font-size: 13px;
  color: #4a637c;
`

const TableTextarea = styled.textarea`
  border: none;
  background: none;
  width: 100%;
  padding: 2px;
  text-align: center;
  margin-top: 10px;
`

const ClickableLink = styled.span`
  cursor: pointer;
  color: ${colors.blue_sea};

  &:hover {
    text-decoration: underline;
  }
`
