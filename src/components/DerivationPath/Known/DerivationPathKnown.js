// @flow

import React from 'react'
import { JText } from 'react-components'

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

export default DerivationPathKnown
