// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import CopyableField from '../../src/components/CopyableField'

const HANDLER = console.log
const PRIVATE_KEY = '0xfb27c2394586feb01403ba3643b519c8f209e0427b31f510a6877b494c020f59'
const MNEMONIC = 'extra write absent bargain raw tilt follow jeans february brief nation express'

storiesOf('CopyableField')
  .add('only copy handler (mnemonic)', () => (
    <CopyableField
      copy={HANDLER}
      value={MNEMONIC}
    />
  ))
  .add('copy & download handlers (private key)', () => (
    <CopyableField
      copy={HANDLER}
      download={HANDLER}
      value={PRIVATE_KEY}
      valueToDisplay={`${PRIVATE_KEY.substr(0, 33)} ${PRIVATE_KEY.substr(33)}`}
    />
  ))
