import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('JbButton', module)
  .add('with text', () => (
    <JbButton onClick={action('clicked')}>Hello Button</JbButton>
  ))
  .add('with some emoji', () => (
    <JbButton onClick={action('clicked')}>😀 😎 👍 💯</JbButton>
  ));