import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'

import 'styles/core.scss'

class CoreLayout extends Component {
  componentWillMount() {
    const { getKeysFromCache, keys } = this.props

    if (!(keys && keys.items && keys.items.length)) {
      getKeysFromCache()
    }
  }

  render() {
    const { children, ...otherProps } = this.props

    console.log(otherProps)

    return (
      <div className='main-content'>
        <Header {...otherProps} />
        <div className='content'>{children}</div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  getKeysFromCache: PropTypes.func.isRequired,
  setActiveKey: PropTypes.func.isRequired,
  addNewKeys: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  clearKeys: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    items: PropTypes.array.isRequired,
    active: PropTypes.number.isRequired,
  }).isRequired,
}

export default CoreLayout
