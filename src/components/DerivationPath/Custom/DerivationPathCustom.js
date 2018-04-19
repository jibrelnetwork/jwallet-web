// @flow

import React from 'react'
import classNames from 'classnames'

import JText from 'components/base/JText'
import handleTargetValue from 'utils/eventHandlers/handleTargetValue'

const DerivationPathCustom = ({ onChange, value, error }: Props) => (
  <div className={classNames('derivation-path-custom', error && '-error')}>
    <input
      onChange={handleTargetValue(onChange)}
      type='text'
      className='input'
      name='derivation-path-custom'
      placeholder='Use custom path'
      autoComplete='off'
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
  error: string,
}

DerivationPathCustom.defaultProps = {
  onChange: () => {},
  value: '',
  error: '',
}

export default DerivationPathCustom
