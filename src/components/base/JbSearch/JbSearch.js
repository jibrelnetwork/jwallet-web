import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import JbIcon from 'components/base/JbIcon'

let searchTimerId

class JbSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { query: props.query }
  }

  render() {
    const { placeholder, className } = this.props

    return (
      <div className={`search ${className}`}>
        <JbIcon name='search' className='search__icon' small />
        <input
          className='search__input'
          type='text'
          placeholder={placeholder}
          title={placeholder}
          onChange={this._search}
          value={this.state.query}
        />
      </div>
    )
  }

  _search = (e) => {
    if (searchTimerId) {
      clearTimeout(searchTimerId)
    }

    const query = e.target.value

    this.setState({ query })

    // to prevent searching by each entered symbol
    searchTimerId = setTimeout(() => this.props.search(query), config.searchTimeout)
  }
}

JbSearch.propTypes = {
  search: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  className: PropTypes.string,
}

JbSearch.defaultProps = {
  className: '',
}

export default JbSearch
