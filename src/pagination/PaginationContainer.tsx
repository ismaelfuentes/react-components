// Libs
import * as React from 'react'

// Components
import Pagination from './Pagination'

// State and props
interface Props {
  // Number of elements displayed per page
  itemsPerPage: number

  // Event to call when the user wants to change the page
  onPageChange?: (page: number) => void

  // Children element
  children: (filters?: any) => React.ReactElement
}

interface State {
  // actual page
  page: number
}

// //
// Component
// //
class PaginationContainer extends React.PureComponent<Props, State> {
  state: State = {
    page: 1,
  }

  handlePageChange = (page: number) => {
    this.setState({
      page,
    })

    if (this.props.onPageChange) {
      this.props.onPageChange(page)
    }
  }

  render() {
    const { children, itemsPerPage } = this.props

    const { page } = this.state

    const filters = {
      after: (page - 1) * itemsPerPage,
      first: itemsPerPage,
    }

    return (
      <>
        {!!children && children(filters)}
        <Pagination
          itemsPerPage={itemsPerPage}
          page={page}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </>
    )
  }
}

export default PaginationContainer
