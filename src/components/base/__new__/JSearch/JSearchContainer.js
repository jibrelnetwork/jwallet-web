// @flow

import { compose } from 'ramda'
import { withHandlers, withStateHandlers } from 'recompose'

import config from 'config'

import JSearch from './JSearch'

type ComponentState = {
  query: string,
  timerId: Index,
  isActive: boolean,
}

type ComponentProps = {
  onChange: Function,
  setQuery: Function,
  setTimerId: Function,
  value: string,
  query: string,
  timerId: Index,
}

export default compose(
  withHandlers({
    onQueryChange: ({ onChange, setQuery, setTimerId, timerId }: ComponentProps) => (e: Object) => {
      if (timerId) {
        clearTimeout(timerId)
      }

      const query: string = e.target.value
      setQuery(query)

      // to prevent searching by each entered symbol
      const newTimerId = setTimeout(() => onChange(query), config.searchTimeout)
      setTimerId(newTimerId)
    },
  }),
  withStateHandlers(
    ({ value }: { value: string }): ComponentState => ({
      query: value,
      timerId: 0,
      isActive: false,
    }),
    {
      setQuery: () => (query: string) => ({ query }),
      setTimerId: () => (timerId: Index) => ({ timerId }),
      toggle: () => (isActive: boolean) => ({ isActive }),
    },
  ),
)(JSearch)
