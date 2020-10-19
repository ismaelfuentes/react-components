// Libs
import styled from 'styled-components'

// //
// Containers
// //
interface GridOptions {
  // How big are the separations between the cells of the grid
  separated?: string
}

export enum GridSizes {
  FULL = 'full',
  TENTH = 'tenth',
  HALF = 'half',
  THIRD = 'third',
  MINUS_THIRD = 'minus_third',
  QUARTER = 'quarter',
  MINUS_QUARTER = 'minus_quarter',
  SIXTH = 'sixth',
  MINUS_SIXTH = 'minus_sixth',
  UNIQUE = 'unique',
  MINUS_UNIQUE = 'minus_unique',
}

const GridContainer = styled.div<GridOptions>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  ${props =>
    props.separated === 'big'
      ? 'grid-row-gap: 25px; grid-column-gap: 30px;'
      : props.separated === 'small'
        ? 'grid-row-gap: 10px; grid-column-gap: 10px;'
        : props.separated === 'none'
          ? 'grid-row-gap: 0px; grid-column-gap: 0px;'
          : ''}
`

// //
// Rows
// //
interface RowOptions {
  size: GridSizes
  newLine?: boolean
}

const ROW_SIZES: any = {
  full: 12,
  tenth: 10,
  half: 6,
  third: 4,
  minus_third: 8,
  quarter: 3,
  minus_quarter: 9,
  sixth: 2,
  minus_sixth: 10,
  unique: 1,
  minus_unique: 11,
}

const GridRow = styled.div<RowOptions>`
  grid-column-end: span ${props => ROW_SIZES[props.size]};
  grid-column-start: ${props => (props.newLine ? '1' : 'auto')};
`

export { GridContainer, GridRow }
