import { configure } from '@storybook/react'

import '../src/styles/core.scss'
import '../src/styles/icons.scss'
import '../src/styles/storybook.scss'

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module)
