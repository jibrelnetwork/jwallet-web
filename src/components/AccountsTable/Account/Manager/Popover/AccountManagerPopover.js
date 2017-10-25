import React from 'react'
import PropTypes from 'prop-types'

import { JIcon, JPopover } from 'components/base'

function AccountManagerPopover(props) {
  const { onClickOutside, removeAccount, editName, setDerivationPath, isMnemonic } = props

  const popoverItems = [{
    handler: editName, title: 'Edit name', show: true, icon: 'edit',
  }, {
    handler: setDerivationPath, title: 'Edit  derivation path', show: isMnemonic, icon: 'gear',
  }, {
    handler: removeAccount, title: 'Clear key', show: true, modifier: 'gray', icon: 'small-clear',
  }]

  const body = (
    <div className='account-manager-popover'>
      {popoverItems.map((item, i) => {
        const { handler, title, show, modifier, icon } = item
        const modifierClassName = modifier ? `popover__item--${modifier}` : ''
        const itemClassName = `popover__item ${modifierClassName}`

        return !show ? null : (
          <div onClick={handler} className={itemClassName} key={i}>
            <JIcon name={icon} className='popover__icon' small />
            <span className='popover__label'>{title}</span>
          </div>
        )
      })}
    </div>
  )

  return <JPopover name='account-manager' onClickOutside={onClickOutside} body={body} />
}

AccountManagerPopover.propTypes = {
  removeAccount: PropTypes.func.isRequired,
  editName: PropTypes.func.isRequired,
  setDerivationPath: PropTypes.func.isRequired,
  isMnemonic: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
}

AccountManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default AccountManagerPopover
