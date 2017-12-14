import React from 'react'
import PropTypes from 'prop-types'

import JPopover from 'components/base/JPopover'

function LanguageManagerPopover({ onClickOutside, setLanguage }) {
  const i18nLanguages = i18n('languages') || {}

  const body = (
    <div className='language-manager__popover'>
      {Object.keys(i18nLanguages).map(languageCode => (
        <div onClick={setLanguage(languageCode)} className='popover__item' key={languageCode}>
          {i18nLanguages[languageCode]}
        </div>
      ))}
    </div>
  )

  return (
    <JPopover
      onClickOutside={onClickOutside}
      body={body}
      name='language-manager'
    />
  )
}

LanguageManagerPopover.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  /* optional */
  onClickOutside: PropTypes.func,
}

LanguageManagerPopover.defaultProps = {
  onClickOutside: () => {},
}

export default LanguageManagerPopover
