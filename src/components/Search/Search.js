import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import JbIcon from 'components/base/JbIcon'

let searchTimerId

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { query: props.query }
  }

  render() {
    const { name } = this.props
    const placeholder = `Search ${name}...`

    return (
      <div className={`search search--${name} pull-left`}>
        <JbIcon name='search' className='search__icon' small />
        <input
          className='search__input'
          type='text'
          placeholder={placeholder}
          title={placeholder}
          onChange={this.search}
          value={this.state.query}
        />
      </div>
    )
  }

  search = (e) => {
    if (searchTimerId) {
      clearTimeout(searchTimerId)
    }

    const query = e.target.value

    this.setState({ query })

    // to prevent searching by each entered symbol
    searchTimerId = setTimeout(() => this.props.search(query), config.searchTimeout)
  }
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
}

export default Search
