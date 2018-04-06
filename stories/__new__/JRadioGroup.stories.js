
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import JRadioGroup from '../../src/components/base/JRadioGroup'

storiesOf('JRadioGroup', module)
  .add('Default', () => (
    <div style={{ width: 500, backgroundColor: '#0050DB' }}>
      <JRadioGroup
        items={[{
          text: 'm/44\'/60\'/0\'/0',
          description: 'Default',
        }, {
          text: 'm/44\'/60\'/160720\'/0',
          description: 'Ledger (ETH)',
        }, {
          text: 'm/44\'/60\'/0',
          description: 'Ledger (ETH)',
        }, {
          text: 'm/44\'/61\'/0\'/0',
          description: 'TREZOR (ETC)',
        }]}
        onChange={value => action(`value: ${value}`)(value)}
        customItem={{
          validators: [{
            rule: value => value.length < 5,
            message: 'Too small',
          }, {
            rule: value => value.length > 10,
            message: 'Too large',
          }],
          placeholder: 'Use custom path',
        }}
        defaultCheckedItemIndex={0}
      />
    </div>
  ))
