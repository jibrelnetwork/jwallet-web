import React from 'react'
import PropTypes from 'prop-types'

import AccountInfo from './Info'
import AccountManager from './Manager'

function Account(props) {
  return <div className='account table-row row clear'>{props.children}</div>
}

Account.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
}

Account.Info = AccountInfo
Account.Manager = AccountManager

export default Account
