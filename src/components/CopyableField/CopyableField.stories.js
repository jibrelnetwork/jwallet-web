// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import CopyableField from 'components/CopyableField'

const HANDLER = console.log
const PRIVATE_KEY = '0xfb27c2394586feb01403ba3643b519c8f209e0427b31f510a6877b494c020f59'
const MNEMONIC = 'extra write absent bargain raw tilt follow jeans february brief nation express'

storiesOf('CopyableField')
  .add('only onCopySuccess handler (mnemonic)', () => (
    <CopyableField
      onCopySuccess={HANDLER}
      value={MNEMONIC}
    />
  ))
  .add('onCopySuccess & onDownloadSuccess handlers (private key)', () => (
    <CopyableField
      onCopySuccess={HANDLER}
      onDownloadSuccess={HANDLER}
      value={PRIVATE_KEY}
      valueToDisplay={`${PRIVATE_KEY.substr(0, 33)} ${PRIVATE_KEY.substr(33)}`}
      isDownloadAvailable
    />
  ))
