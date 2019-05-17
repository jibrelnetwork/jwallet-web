
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
  'blue',
  'white',
]

storiesOf('base|Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <h2>blue</h2>
      <Button
        onClick={action('onClick')}
        theme='blue'
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>white</h2>
      <Button
        onClick={action('onClick')}
        theme='white'
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
        theme={select('Theme', THEMES_FOR_STATUSES, 'blue')}
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>Disabled</h2>
      <Button
        onClick={action('onClick')}
        theme={select('Theme', THEMES_FOR_STATUSES, 'blue')}
        isDisabled
      >
        {text('Label', 'Yes, delete')}
      </Button>
      <h2>Loading</h2>
      <Button
        onClick={action('onClick')}
        theme={select('Theme', THEMES_FOR_STATUSES, 'blue')}
        isLoading
      >
        {text('Label', 'Yes, delete')}
      </Button>
    </div>
  ))
