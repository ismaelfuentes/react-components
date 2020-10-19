// Libs
import React from 'react'
import styled from 'styled-components'

// Components
import Button from '../button/Button'

// State & props
interface Props {
  // Enable or disable the buttons
  forwardEnable: boolean
  backwardEnable: boolean
  // buttons callbacks
  onGoForward: () => void
  onGoBackward: () => void
}

function Pagination(props: Props) {
  const { forwardEnable, backwardEnable, onGoForward, onGoBackward } = props

  return (
    <PaginationButtons>
      <Button
        type="success"
        testId="id-picker-select"
        text="Anterior"
        onClick={onGoBackward}
        disabled={!backwardEnable}
      />
      <Button
        type="success"
        testId="id-picker-select"
        text="Siguiente"
        onClick={onGoForward}
        disabled={!forwardEnable}
      />
    </PaginationButtons>
  )
}

export default Pagination

// //
// Styles
// //
const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;

  & > * {
    margin: 0 0.5em;
  }
`

// FUTURE PAGINATION
// De momento lo dejo comentado porque el BE no está preparado, pero se meterá en cuanto haya tiempo
/*

import ReactPaginate from 'react-paginate'
import { ReactComponent as Caret } from './caret.svg'

<PaginationContainer>
  <Pagination>
    <ReactPaginate
      previousLabel={<PageLinkPrevious className="noshadow" />}
      nextLabel={<PageLinkNext className="noshadow " />}
      breakLabel={
        <span className="pagination-ellipsis">&hellip;</span>
      }
      breakClassName={'pagination-ellipsis'}
      pageCount={pageCount}
      forcePage={after / first}
      marginPagesDisplayed={2}
      initialPage={0}
      pageRangeDisplayed={5}
      disableInitialCallback
      onPageChange={this.handlePageClick}
      containerClassName={'pagination is-centered'}
      activeClassName={'active-page'}
    />
  </Pagination>
</PaginationContainer>

const PaginationContainer = styled.div`
  padding: 0px 0px 0px 0px;
  margin: -45px 0px 0px 0px;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
`

const MessagesDashboard = styled.div`
  display: flex;

  width: 100%;
  background-color: white;
  padding-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 10px 10px 10px;
`

const Pagination = styled(MessagesDashboard)`
  .pagination {
    margin: 0.75rem;
    justify-content: center;
  }

  .disabled {
    opacity: 0.4;
  }

  .active-page > a {
    border-color: transparent;
    background-color: #10d4ab;
    color: white;
  }
  li:first-child a,
  li:last-child a {
    background-color: transparent;
  }
  li {
    margin: 0 2px;
  }
  li a {
    font-size: 14px;
    padding: 6px 0px;
    color: #5c6b7e;
    display: block;
    width: 36px;
    background-color: ${props => props.theme.gray[10]};

    &:focus {
      outline: none;
    }
  }
`

const PageLinkPrevious = styled(Caret)<{ className: string }>`
  margin-right: 30px;
  vertical-align: middle;
  color: ${props => props.theme.gray[30]};
  transform: rotate(90deg);
  opacity: 0.7;
`

const PageLinkNext = styled(Caret)<{ className: string }>`
  margin-left: 30px;
  vertical-align: middle;
  color: ${props => props.theme.gray[30]};
  transform: rotate(-90deg);
  opacity: 0.7;
`
*/
