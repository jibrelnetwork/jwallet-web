// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs'

import { FieldPreview } from './FieldPreview'

const PRIVATE_KEY = '0xfb27c2394586feb01403ba3643b519c8f209e0427b31f510a6877b494c020f59'

storiesOf('FieldPreview', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const Tag = boolean('Show wrapper', false)
      ? 'div'
      : 'Fragment'

    return (
      <div className='story'>
        <Tag className='details'>
          <FieldPreview
            label={text('Label', 'Sender')}
            body={text('Body', 'My First Wallet')}
            link={text('Link', 'http://google.com')}
            contact={text('Contact Address', PRIVATE_KEY)}
            copy={text('Copy string', PRIVATE_KEY)}
          />
        </Tag>
      </div>)
  })
  .add('Transaction details part', () => (
    <div className='story'>
      <div className='details'>
        <FieldPreview
          label='Amount'
          body='−1.4002 ETH'
        />
        <FieldPreview
          label='Sender'
          body='My First Wallet'
          link='https://jibrel.network'
          copy='Hello world'
        />
        <FieldPreview
          label='Recipient'
          body='0x000d2bod...D8р0641a81'
          link='https://jibrel.network'
          contact='https://jibrel.network'
          copy={PRIVATE_KEY}
        />
        <FieldPreview
          label='Blockchain transaction'
          body='0xfb27c2...b494c020f59'
          link='https://jibrel.network'
          copy={PRIVATE_KEY}
        />
        <FieldPreview
          label='Estimated blockchain fee'
          body='0.000001 ETH'
        />
      </div>
    </div>
  ))
