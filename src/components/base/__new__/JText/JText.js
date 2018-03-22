// @flow

import React from 'react'
import classNames from 'classnames'

type Props = {
  value: string,
  variants?: Array<string>,
}

const JText = ({ value, variants }: Props) => (
  <div
    className={classNames(
      'j-text',
      variants.filter(i => !!i).map(variant => `-${variant}`).join(' ')
    )}
  >
    {i18n(value) || value}
  </div>
)

JText.defaultProps = {
  variants: [],
}

export default JText
