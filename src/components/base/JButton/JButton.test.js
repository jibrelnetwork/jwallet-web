/* @flow */

import React from 'react'
import renderer from 'react-test-renderer'

import JButton from './JButton'

describe('COMPONENT: JButton', () => {
  test('Blue', () => {
    expect(renderer.create(
      <JButton
        size='big'
        color='blue'
      />
    ).toJSON()).toMatchSnapshot()
  })
})
