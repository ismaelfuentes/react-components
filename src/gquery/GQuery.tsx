// Libs
import * as React from 'react'
import { Query, QueryResult } from 'react-apollo'

// State and props
interface Props {
  // Query to send to the BE
  query: any

  // Variables that the query requires and we want to send
  variables?: any

  // In case we want to specify when to ask the BE or the cache
  fetchPolicy?: string

  // Callbacks when success or failure
  onSuccess?: (data?: any) => void
  onFailure?: (error?: any, data?: any) => void

  // Child element in the dom after the query
  children: (data?: any) => React.ReactElement
}

// //
// Component
// //
class GQuery extends React.PureComponent<Props, {}> {
  renderLoading = () => {
    return <span>Cargando...</span>
  }

  renderError = () => {
    return (
      <span>
        Algo no ha ido bien, contacta con el equipo técnico y revista tu
        conexión a internet
      </span>
    )
  }

  render() {
    const {
      query,
      variables = {},
      fetchPolicy = 'cache-first',
      onSuccess,
      onFailure,
      children = null,
    } = this.props

    return (
      <Query query={query} variables={variables} fetch-policy={fetchPolicy}>
        {({ data, loading, error }: QueryResult) => {
          if (error) {
            if (onFailure) {
              onFailure(error, data)
            }

            return this.renderError()
          }

          if (loading || !data) {
            return this.renderLoading()
          }

          if (onSuccess) {
            onSuccess(data)
          }

          if (children) {
            return children(data)
          }

          return <></>
        }}
      </Query>
    )
  }
}

export default GQuery
