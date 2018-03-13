
/* @flow */

import React from 'react'
import { storiesOf, action } from '@storybook/react'

import JSelect from '.';

storiesOf('JSelect', module)
  .add('Standard', () => (
    <div style={{ width: 500 }}>
      <JSelect
        title='asset'
        items={[{
          id: 1,
          icon: 'ant-token',
          title: 'Token 1',
          description: '1 ETH',
        }, {
          id: 2,
          icon: 'ant-token',
          title: 'Token 2',
          description: '2 ETH',
        }, {
          id: 3,
          icon: 'ant-token',
          title: 'Token 3',
          description: '3 ETH',
        }, {
          id: 4,
          icon: 'ant-token',
          title: 'Token 4',
          description: '4 ETH',
        }, {
          id: 5,
          icon: 'ant-token',
          title: 'Token 5',
          description: '5 ETH',
        }]}
        onItemSelect={id => action(`Selected id: ${id}`)(id)}
        selectedItemId={1}
      />
    </div>
  ))
