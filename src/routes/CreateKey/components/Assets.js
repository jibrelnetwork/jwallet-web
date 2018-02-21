import React from 'react'
import PropTypes from 'prop-types'

import JButton from 'components/base/JButton'

const Assets = ({ setNextStep }) => (
  <div className='create-key-assets'>
    <div>{'Popular assets'}</div>
    <JButton onClick={setNextStep} label={i18n('routes.createKey.buttonTitle.finish')} blue />
  </div>
)

Assets.propTypes = {
  setNextStep: PropTypes.func.isRequired,
}

export default Assets
