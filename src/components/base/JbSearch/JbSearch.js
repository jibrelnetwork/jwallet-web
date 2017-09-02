import React, { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

import JbIcon from 'components/base/JbIcon'

let searchTimerId

class JbSearch extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  render() {
    const { placeholder, className = '' } = this.props

    return (
      <div className={`search ${className}`}>
        <JbIcon name='search' className='search__icon' small />
        <input
          className='search__input'
          type='text'
          placeholder={placeholder}
          title={placeholder}
          onChange={this._search}
          value={this.state.text}
        />
      </div>
    )
  }

  _search = (e) => {
    if (searchTimerId) {
      clearTimeout(searchTimerId)
    }

    const text = e.target.value

    this.setState({ text })

    // to prevent searching by each entered symbol
    searchTimerId = setTimeout(() => this.props.search(text), config.searchTimeout)
  }
}

JbSearch.propTypes = {
  search: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default JbSearch
