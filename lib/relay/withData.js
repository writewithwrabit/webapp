import React from 'react'
import initEnvironment from './createRelayEnvironment'
import { fetchQuery, QueryRenderer } from 'react-relay'

export default (ComposedComponent, options = {}) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`

    static async getInitialProps (ctx) {
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      let queryProps = {}
      let queryRecords = {}
      const environment = initEnvironment()

      if (options.query) {
        // Provide the `url` prop data in case a graphql query uses it
        // const url = { query: ctx.query, pathname: ctx.pathname }
        const variables = {}
        // TODO: Consider RelayQueryResponseCache
        // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
        queryProps = await fetchQuery(environment, options.query, variables)
        queryRecords = environment
          .getStore()
          .getSource()
          .toJSON()
      }

      return {
        ...composedInitialProps,
        ...queryProps,
        queryRecords
      }
    }

    constructor (props) {
      super(props)
      this.environment = initEnvironment({
        records: props.queryRecords
      })
    }

    render () {
      return (
        <QueryRenderer
          environment={this.environment}
          query={options.query}
          variables={{}}
          renderer={({ error, props }) => {
            if (error) {
              return <div>Error!</div>
            }

            if (!props) {
              return <div>Loading...</div>
            }

            return <div>{props}</div>
          }}
        />
      )
    }
  }
}