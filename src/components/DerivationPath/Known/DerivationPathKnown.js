// @flow

import React from 'react'

import JText from 'components/base/JText'

const DerivationPathKnown = ({ path, description }: Props) => (
  <div className='derivation-path-known'>
    <div className='path'>
      <JText value={path} />
    </div>
    <div className='description'>
      <JText value={description} />
    </div>
  </div>
)

type Props = {
  path: string,
  description: string,
}

DerivationPathKnown.defaultProps = {
  path: '',
  description: '',
}

export default DerivationPathKnown
