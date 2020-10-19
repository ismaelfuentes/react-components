// Libs
import * as React from 'react'
import styled from 'styled-components'

// Components
import { default as Button, ButtonTypes } from '../button/Button'
import Input from '../form/input/Input'
import Select from '../form/select/Select'

// State and props
interface Props {
  options: any[]
  onApplyFilters: (filteres: any) => void
}

interface State {
  filters: any[]
}

// //
// Component
// //
class MultiFilter extends React.PureComponent<Props, State> {
  state: State = {
    filters: [
      {
        key: '',
        value: '',
      },
    ],
  }

  handleApplyFilters = (newFilters: any) => {
    const filtersValue: any = {}
    const filters =
      typeof newFilters === 'object' ? newFilters : this.state.filters

    filters.forEach((filter: any) => {
      filtersValue[filter.key] = filter.value
    })
    this.props.onApplyFilters(filtersValue)
  }

  onSelectChange = (key: string, value: any) => {
    let newFilters = [...this.state.filters]

    if (!value) {
      newFilters.splice(parseInt(key), 1)
    } else {
      newFilters[parseInt(key)].key = value.value
    }

    if (!value) {
      this.handleApplyFilters(newFilters)
    }

    if (newFilters.length === 0) {
      newFilters = [
        {
          key: '',
          value: '',
        },
      ]
    }

    this.setState({
      filters: newFilters,
    })
  }

  onInputChange = (key: string, value: string) => {
    this.setState((prevState: State) => ({
      filters: prevState.filters.map((filter: any, index: number) =>
        index === parseInt(key, 10) ? { ...filter, value } : filter
      ),
    }))
  }

  addNewFilter = () => {
    const filters = this.state.filters.slice(0)

    filters.push({
      key: '',
      value: '',
    })

    this.setState({
      filters,
    })
  }

  render() {
    const { filters } = this.state

    const options = this.props.options

    const isFilterEmpty: boolean = filters.length === 1 && filters[0].key === ''

    const filterList = filters.map((filter: any, index: number) => {
      return (
        <FilterContainer key={index + filter.key}>
          <Select
            id={index.toString()}
            value={filter.key}
            options={options}
            showEmpty={true}
            emptyValue="Filtrar por ..."
            onChange={this.onSelectChange}
          />
          <Input
            id={index.toString()}
            value={filter.value}
            onChange={this.onInputChange}
            type="text"
            placeholder="Valor a filtrar"
            onKeyEnter={this.handleApplyFilters}
          />
        </FilterContainer>
      )
    })

    return (
      <>
        {isFilterEmpty ? (
          <FilterContainer>
            <Select
              id={'0'}
              value={filters[0].key}
              emptyValue="Filtrar por ..."
              options={options}
              showEmpty={true}
              onChange={this.onSelectChange}
            />
          </FilterContainer>
        ) : (
          <>
            {filterList}
            <NewFilterButton>
              <Button
                type={ButtonTypes.INPUT}
                text="+"
                onClick={this.addNewFilter}
              />
            </NewFilterButton>
          </>
        )}
      </>
    )
  }
}

export default MultiFilter

// //
// Styles
// //
const FilterContainer = styled.div`
  display: inline-block;

  & > * {
    float: left;
    margin-right: 1em;
    width: 185px;
  }
`

const NewFilterButton = styled.div`
  display: inline-block;
  vertical-align: top;
`
