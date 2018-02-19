import React from 'react'
import PropTypes from 'prop-types'

import JButton from 'components/base/JButton'

const ClearKeys = ({ clear }) => (
  <div className='clear-keys-view'>
    <div className='clear-keys-info'>
      <div className='clear-keys-info__title'>{i18n('routes.clearKeys.info.title')}</div>
      <div className='clear-keys-info__text'>
        {i18n('routes.clearKeys.info.text[0]')}<br />
        {i18n('routes.clearKeys.info.text[1]')}
      </div>
    </div>
    <JButton onClick={clear} label={i18n('routes.clearKeys.buttonTitle')} blue />
  </div>
)

ClearKeys.propTypes = {
  clear: PropTypes.func.isRequired,
}

export default ClearKeys
