/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs'

import { ContactIcon } from './ContactIcon'

storiesOf('icons|ContactIcon', module)
  .addDecorator(withKnobs)
  .add('ContactIcon', () => (
    <div className='story'>
      <ContactIcon
        name={text('Name', 'Vasya Pupkin')}
        forceAddressIcon={boolean('Force addeess icon', false)}
      />
    </div>
  ))
