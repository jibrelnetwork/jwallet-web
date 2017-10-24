import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function AccountManagerPopover(props) {
  const { onClickOutside, removeAccount, editName, setDerivationPath, isMnemonicType } = props

  const popoverItems = [{
    handler: editName, title: 'Edit name', show: true,
  }, {
    handler: setDerivationPath, title: 'Edit  derivation path', show: isMnemonicType,
  }, {
    handler: removeAccount, title: 'Clear key', show: true, modifier: 'gray',
  }]

  const body = (
    <div className='account-manager-popover'>
      {popoverItems.map((item, i) => {
        const { handler, title, show, modifier } = item
        const modifierClassName = modifier ? `popover__item--${modifier}` : ''
        const itemClassName = `popover__item ${modifierClassName}`

        return show ? <div onClick={handler} className={itemClassName} key={i}>{title}</div> : null
      })}
    </div>
  )

  return <JPopover name='account-manager' onClickOutside={onClickOutside} body={body} />
}

AccountManagerPopover.propTypes = {
  removeAccount: PropTypes.func.isRequired,
  editName: PropTypes.func.isRequired,
  setDerivationPath: PropTypes.func.isRequired,
  isMnemonicType: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func,
}

AccountManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default AccountManagerPopover
