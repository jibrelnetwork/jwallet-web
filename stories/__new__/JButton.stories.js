
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import JButton from '../../src/components/base/JButton'

storiesOf('JButton', module)
  .add('Large blue', () => (
    <JButton
      text='Some text'
      color='blue'
      large
    />
  ))
  .add('Large white', () => (
    <JButton
      text='Some text'
      color='white'
      large
    />
  ))
  .add('Regular blue', () => (
    <JButton
      text='Some text'
      color='blue'
    />
  ))
  .add('Regular white', () => (
    <JButton
      text='Some text'
      color='white'
    />
  ))
  .add('Small white with icon', () => (
    <JButton
      text='Some text'
      color='white'
      iconName='repeat'
    />
  ))
  .add('Minimal white', () => (
    <div style={{ backgroundColor: '#0050db' }}>
      <JButton
        text='Some text'
        color='white'
        minimal
      />
    </div>
  ))
  .add('Minimal blue', () => (
    <JButton
      text='Some text'
      color='blue'
      minimal
    />
  ))
  .add('Minimal white with icon', () => (
    <div style={{ backgroundColor: '#0050db' }}>
      <JButton
        text='Some text'
        color='white'
        minimal
        iconName='key-import-white'
      />
    </div>
  ))
  .add('Minimal white without text', () => (
    <JButton
      color='white'
      minimal
      iconName='search'
      iconSize='medium'
    />
  ))
