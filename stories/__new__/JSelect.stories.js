
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import JSelect from '../../src/components/base/JSelect'

storiesOf('JSelect', module)
  .add('For token', () => (
    <div style={{ width: 500 }}>
      <JSelect
        title='asset'
        content={{
          type: 'token',
          items: [{
            id: 1,
            icon: 'token-ant',
            title: 'Token 1',
            description: '1 ETH',
          }, {
            id: 2,
            icon: 'token-bat',
            title: 'Token 2',
            description: '2 ETH',
          }, {
            id: 3,
            icon: 'token-gno',
            title: 'Token 3',
            description: '3 ETH',
          }, {
            id: 4,
            icon: 'token-jeur',
            title: 'Token 4',
            description: '4 ETH',
          }, {
            id: 5,
            icon: 'token-mco',
            title: 'Token 5',
            description: '5 ETH',
          }],
        }}
        onItemSelect={id => action(`Selected id: ${id}`)(id)}
        selectedItemId={1}
      />
    </div>
  ))
