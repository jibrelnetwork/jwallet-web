// @flow

import React from 'react'
import classNames from 'classnames'
import { JText } from 'react-components'

import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

const DerivationPathCustom = ({ onChange, value, error }: Props) => (
  <div className={classNames('derivation-path-custom', error && '-error')}>
    <input
      onChange={handleTargetValue(onChange)}
      type='text'
      className='input'
      autoComplete='off'
      name='derivation-path-custom'
      placeholder='Use custom path'
      value={value}
    />
    {error && (
      <div className='error'>
        <JText value={error} color='red' size='small' />
      </div>
    )}
  </div>
)

type Props = {
  onChange: Function,
  value: string,
  error: ?string,
}

export default DerivationPathCustom
