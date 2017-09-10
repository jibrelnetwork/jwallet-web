import { Component } from 'react'
import PropTypes from 'prop-types'

import { searchItems, sortItems } from 'utils'

class JbTable extends Component {
  constructor(props) {
    super(props)

    const { items, searchQuery, sortField, sortDirection } = props

    this.state = { searchQuery, sortField, sortDirection, items }
  }

  componentWillMount() {
    this.searchItems(this.state.searchQuery)
  }

  componentWillReceiveProps(nextProps) {
    this.initState(nextProps)
  }

  initState(props) {
    const { items, searchQuery, sortField, sortDirection } = props

    this.setState({ searchQuery, sortField, sortDirection, items })
  }

  searchItems = (searchQuery) => {
    const { sortField } = this.state
    const foundItems = this.getFoundItems(this.props.items, searchQuery)
    const result = this.getSortedItems(foundItems, sortField, true)

    this.setState({
      searchQuery,
      items: result.items,
      sortField: result.sortField,
      sortDirection: result.sortDirection,
    })

    // syncItems(result.items)
  }

  sortItems = (field) => {
    return (/* event */) => {
      const result = this.getSortedItems(this.props.items, field)
      const foundItems = this.getFoundItems(result.items)

      this.setState({
        items: foundItems,
        sortField: result.sortField,
        sortDirection: result.sortDirection,
      })

      // this.state.syncItems(foundItems)
    }
  }

  getFoundItems(items, searchQuery = this.state.searchQuery) {
    return searchItems(items, searchQuery)
  }

  getSortedItems(items, newField, changeDirection) {
    const { sortField, sortDirection } = this.state

    /**
     * We need to change sort direction during of searching,
     * because old and new fields are equal and during of sorting,
     * direction will be changed again
     */
    const anotherDirection = (sortDirection === 'ASC') ? 'DESC' : 'ASC'
    const newDirection = changeDirection ? anotherDirection : sortDirection

    return sortItems(items, sortField, newField, newDirection)
  }
}

JbTable.propTypes = {
  items: PropTypes.array.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default JbTable
