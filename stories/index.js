import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import JbButton from '../src/components/JbButton/';

storiesOf('JbButton', module)
  .add('with text', () => (
    <JbButton onClick={action('clicked')} text="Hello Button"/>
  ))
  .add('with some emoji', () => (
    <JbButton onClick={action('clicked')} text="😀 😎 👍 💯"/>
  ));