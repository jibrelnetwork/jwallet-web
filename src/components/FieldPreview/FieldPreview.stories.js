// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs'

import { FieldPreview } from 'components/FieldPreview/FieldPreview'

// const PRIVATE_KEY = '0xfb27c2394586feb01403ba3643b519c8f209e0427b31f510a6877b494c020f59'
// const MNEMONIC = 'extra write absent bargain raw tilt follow jeans february brief nation express'

storiesOf('FieldPreview', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div className='story'>
      <FieldPreview
        label={text('Label', 'Sender')}
        body={text('Body', 'My First Wallet')}
        link={text('Link', 'http://google.com')}
        hasCopy={boolean('Copy icon', false)}
        hasAddContact={boolean('Add Contact icon', true)}
      />
    </div>
  ))
