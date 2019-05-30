// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import { CopyableField } from './CopyableField'

const MNEMONIC = 'extra write absent bargain raw tilt follow jeans february brief nation express'

storiesOf('CopyableField', module)
  .add('default', () => (
    <CopyableField
      value={MNEMONIC}
      label='Mnemonic Phrase'
    />
  ))
