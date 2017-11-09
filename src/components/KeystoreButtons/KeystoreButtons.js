import React from 'react'
import PropTypes from 'prop-types'

import JButton from 'components/base/JButton'

function KeystoreButtons({ openNewKeystoreAccountModal, openImportKeystoreAccountModal }) {
  return (
    <div className='transactions'>
      <div className='keystore-buttons'>
        <div className='keystore-buttons__create'>
          <JButton
            onClick={openNewKeystoreAccountModal}
            label='Create new key'
            iconName='small-add-white'
            blue
          />
        </div>
        <div className='keystore-buttons__delimiter'>{'OR'}</div>
        <div className='keystore-buttons__import'>
          <JButton
            onClick={openImportKeystoreAccountModal}
            label='Import key'
            iconName='small-backup'
            white
          />
        </div>
      </div>
    </div>
  )
}

KeystoreButtons.propTypes = {
  openNewKeystoreAccountModal: PropTypes.func.isRequired,
  openImportKeystoreAccountModal: PropTypes.func.isRequired,
}

export default KeystoreButtons
