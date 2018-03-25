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
      variants ? variants.filter(i => !!i).map(variant => `-${variant}`).join(' ') : null,
    )}
  >
    {i18n(value) || value}
  </div>
)

JText.defaultProps = {
  variants: [],
}

export default JText
