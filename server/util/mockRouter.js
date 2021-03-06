import React from 'react'
import Router from 'next/router'

const actionWithPromise = () => {
  console.log('route changed')
  return new Promise((resolve, reject) => reject(Error('fail promise')))
}

const withMockRoute = (WrappedComponent, path, query) => {
  // ...and returns another component...
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        router: {
          asPath: path,
          route: path,
          pathname: path,
          query: query,
          // TODO: Properly mock the following methods
          back () {},
          beforePopState () {},
          prefetch () {},
          push: actionWithPromise,
          reload: actionWithPromise,
          replace: actionWithPromise,
          events: {
            // TODO: Implement EventEmitter
            on () {},
            off () {},
            trigger () {}
          }
        }
      }
    }

    render () {
      Router.router = this.state
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

export default withMockRoute
