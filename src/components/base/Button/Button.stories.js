
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  select,
} from '@storybook/addon-knobs'

import {
  Button,
  JIcon,
} from 'components/base'

const THEMES_FOR_STATUSES = [
  'general',
  'secondary',
]

storiesOf('base|Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <h2>general</h2>
      <Button
        onClick={action('onClick')}
        theme='general'
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>secondary</h2>
      <Button
        onClick={action('onClick')}
        theme='secondary'
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>additional</h2>
      <Button
        onClick={action('onClick')}
        theme='additional'
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>additional-icon</h2>
      <Button
        onClick={action('onClick')}
        theme='additional-icon'
      >
        <JIcon
          name='ic_manage_24-use-fill'
          className={Button.iconClassName}
        />
        {text('Label', 'Yes, delete')}
      </Button>
    </div>
  ))
  .add('Different status', () => (
    <div>
      <h2>Default</h2>
      <Button
        onClick={action('onClick')}
        theme={select('Theme', THEMES_FOR_STATUSES, 'general')}
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>Disabled</h2>
      <Button
        onClick={action('onClick')}
        theme={select('Theme', THEMES_FOR_STATUSES, 'general')}
        isDisabled
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>Loading</h2>
      <Button
        onClick={action('onClick')}
        theme={select('Theme', THEMES_FOR_STATUSES, 'general')}
        isLoading
      >
        {text('Label', 'Yes, delete')}
      </Button>
    </div>
  ))
