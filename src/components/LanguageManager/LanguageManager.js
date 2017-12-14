import React from 'react'
import PropTypes from 'prop-types'

import { JDropdown, JIcon } from 'components/base'

import LanguageManagerPopover from './Popover'

function LanguageManager({ setLanguage }) {
  const title = (
    <div className='language-manager__title pull-right'>
      <div className='language-manager__head'>
        {i18n(`languages.${i18n('language')}`)}
      </div>
      <JIcon name='small-arrow-blue' className='language-manager__icon' small />
    </div>
  )

  return (
    <JDropdown
      title={title}
      className='language-manager'
      parentClassName='header__language-manager pull-right'
    >
      <LanguageManagerPopover setLanguage={setLanguage} />
    </JDropdown>
  )
}

LanguageManager.propTypes = {
  setLanguage: PropTypes.func.isRequired,
}

export default LanguageManager
