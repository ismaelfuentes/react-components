// Libs
import * as React from 'react'
import styled from 'styled-components'

// Components
import Select, { Option } from '../form/select/Select'

// State and props
interface Props {
  // Number of elements displayed per page
  itemsPerPage: number

  // Actual page we are watching
  page: number

  // Total items in the search
  itemsTotal?: number

  // Event to call when the user wants to change the page
  onPageChange: (page: number) => void
}

// //
// Component
// //
class Pagination extends React.PureComponent<Props, {}> {
  handlePrevPage = () => {
    const { onPageChange, page } = this.props

    if (page === 1) {
      return
    }
    onPageChange(page - 1)
  }

  handleNextPage = () => {
    const { onPageChange, page } = this.props

    if (page === this.getNumPages()) {
      return
    }
    onPageChange(page + 1)
  }

  handlePageSelected = (index: string, value: any) => {
    if (index || !index) {
      this.props.onPageChange(parseInt(value.value))
    }
  }

  getNumPages = () => {
    const { itemsTotal = 0, itemsPerPage } = this.props

    return Math.ceil(itemsTotal / itemsPerPage)
  }

  renderPageSelector = (numPages: number, page: number) => {
    const options = []

    for (let i = 1; i <= numPages; i++) {
      options.push({ label: i.toString(), value: i.toString() })
    }

    const value: Option = {
      label: page.toString(),
      value: page.toString(),
    }

    return (
      <Select
        key={`select_${page.toString()}`}
        fullWidth={false}
        id="page_selector"
        options={options}
        value={value}
        onChange={this.handlePageSelected}
        showEmpty={false}
      />
    )
  }

  renderPageNumber = (page: number) => {
    return <SinglePageNumber>{page}</SinglePageNumber>
  }

  render() {
    const { page, itemsTotal } = this.props
    const numPages = this.getNumPages()

    return (
      <PaginationContainer>
        <PaginationArrowBack
          disabled={page === 1}
          onClick={!(page === 1) ? this.handlePrevPage : () => null}
        >
          ►
        </PaginationArrowBack>
        {itemsTotal
          ? this.renderPageSelector(numPages, page)
          : this.renderPageNumber(page)}
        {itemsTotal ? <ActualPage> de {numPages}</ActualPage> : ''}
        <PaginationArrow
          disabled={!itemsTotal || page === numPages}
          onClick={
            itemsTotal || page === numPages ? () => null : this.handleNextPage
          }
        >
          ►
        </PaginationArrow>
        {itemsTotal ? (
          <TotalContainer>Total de elementos: {itemsTotal}</TotalContainer>
        ) : (
          ''
        )}
      </PaginationContainer>
    )
  }
}

export default Pagination

// //
// Styles
// //
const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
  position: relative;
`

const ActualPage = styled.div`
  display: flex;
  color: #4a637c;
  margin-left: 1em;
  align-items: center;
`

const TotalContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 10px;
  background: white;
  padding: 4px;
  border: 1px solid #ccd2d9;
  color: #4a637c;
  font-size: 14px;
`

const PaginationArrow = styled.div<{ disabled: boolean }>`
  padding: 10px;
  color: ${props => (props.disabled ? '#dfe4ea' : '#a4a9b1')};
  font-size: 15px;
  display: flex;
  align-self: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`

const PaginationArrowBack = styled(PaginationArrow)`
  transform: rotate(180deg);
`

const SinglePageNumber = styled(ActualPage)`
  margin-left: 0;
`
