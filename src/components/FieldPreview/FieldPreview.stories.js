// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  text,
  boolean,
  withKnobs,
} from '@storybook/addon-knobs'

import { FieldPreview } from './FieldPreview'

const ADDRESS: string = '0xfb27c2394586feb01403ba3643b519c8f209e0'

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
            value={text('Body', 'My First Wallet')}
            link={text('Link', 'http://google.com')}
            isContact
            isCopyable
          />
        </Tag>
      </div>)
  })
  .add('Transaction details part', () => (
    <div className='story'>
      <div className='details'>
        <FieldPreview
          label='Amount'
          value='−1.4002 ETH'
        />
        <FieldPreview
          label='Sender'
          value='My First Wallet'
          link='https://jibrel.network'
          isCopyable
        />
        <FieldPreview
          value={ADDRESS}
          label='Recipient'
          link='https://jibrel.network'
          valueToShow='0x000d2bod...D8р0641a81'
          isContact
          isCopyable
        />
        <FieldPreview
          value={ADDRESS}
          link='https://jibrel.network'
          label='Blockchain transaction'
          valueToShow='0xfb27c2...b494c020f59'
          isCopyable
        />
        <FieldPreview
          label='Estimated blockchain fee'
          value='0.000001 ETH'
        />
      </div>
    </div>
  ))
