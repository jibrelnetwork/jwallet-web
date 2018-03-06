/* @flow */

import React from 'react'
import renderer from 'react-test-renderer'

import JIcon from './JIcon'

describe('COMPONENT: JIcon', () => {
  test('Small close', () => {
    expect(renderer.create(
      <JIcon
        size='small'
        name='close'
      />
    ).toJSON()).toMatchSnapshot()
  })
})
