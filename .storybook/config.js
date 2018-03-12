import { configure } from '@storybook/react';

const components = require.context('../src/components', true, /.stories.js$/);

const loadStories = () => {
  components.keys().forEach(filename => components(filename));
}

configure(loadStories, module);

global.i18n = _ => _