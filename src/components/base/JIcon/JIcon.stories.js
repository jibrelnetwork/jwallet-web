// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  select,
} from '@storybook/addon-knobs'

import { JIcon } from 'components/base'

// $FlowFixMe
const filesSmall = require.context(
  '../../../public/assets/icons/sprite-pack/small', true, /.*\.svg$/,
)

// $FlowFixMe
const filesMedium = require.context(
  '../../../public/assets/icons/sprite-pack/medium', true, /.*\.svg$/,
)

// $FlowFixMe
const filesLarge = require.context(
  '../../../public/assets/icons/sprite-pack/large', true, /.*\.svg$/,
)

// $FlowFixMe
const filesXLarge = require.context(
  '../../../public/assets/icons/sprite-pack/xlarge', true, /.*\.svg$/,
)

// $FlowFixMe
const filesColored = require.context(
  '../../../public/assets/icons/sprite-colored', true, /.*\.svg$/,
)

const iconsSmall = filesSmall
  .keys()
  .map(
    filepath =>
      filesSmall(filepath).default.id.replace(/-usage$/, ''),
  )
const iconsMedium = filesMedium
  .keys()
  .map(
    filepath =>
      filesMedium(filepath).default.id.replace(/-usage$/, ''),
  )
const iconsLarge = filesLarge
  .keys()
  .map(
    filepath =>
      filesLarge(filepath).default.id.replace(/-usage$/, ''),
  )
const iconsXLarge = filesXLarge
  .keys()
  .map(
    filepath =>
      filesXLarge(filepath).default.id.replace(/-usage$/, ''),
  )

const iconsColored = filesColored
  .keys()
  .map(
    filepath =>
      filesColored(filepath).default.id.replace(/-usage$/, ''),
  )

const AVAILABLE_COLORS = [
  null,
  'white',
  'blue',
  'gray',
  'sky',
  'red',
  'black',
]

// this array is created specifically to be sorted here
// eslint-disable-next-line fp/no-mutating-methods
const AVAILABLE_ICONS = [
  ...iconsSmall,
  ...iconsMedium,
  ...iconsLarge,
  ...iconsXLarge,
].sort()

storiesOf('JIcon', module).addDecorator(withKnobs)
  .add('Customizable', () => (
    <div>
      <h2 className='title'>Customizable example</h2>
      <div className='icon-demo-container'>
        <JIcon
          name={select('Name', AVAILABLE_ICONS, AVAILABLE_ICONS[0])}
          color={select('Color', AVAILABLE_COLORS, 'blue')}
          className={select(
            'Class name',
            {
              'none': null,
              'icon-with-magenta-color-and-margins': 'icon-with-magenta-color-and-margins',
            },
            null,
          )}
        />
      </div>
    </div>
  ))
  .add('List of all icons', () => {
    const allIconsListColorSelectValue = select('Color', AVAILABLE_COLORS, 'blue')

    return (
      <div>
        <section>
          <h2 className='title'>Small</h2>
          <ul className='icons-list'>
            {iconsSmall.map(name => (
              <li key={name}>
                <JIcon
                  name={name}
                  color={allIconsListColorSelectValue}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className='title'>Medium</h2>
          <ul className='icons-list'>
            {iconsMedium.map(name => (
              <li key={name}>
                <JIcon
                  name={name}
                  color={allIconsListColorSelectValue}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className='title'>Large</h2>
          <ul className='icons-list'>
            {iconsLarge.map(name => (
              <li key={name}>
                <JIcon
                  name={name}
                  color={allIconsListColorSelectValue}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className='title'>X-Large</h2>
          <ul className='icons-list'>
            {iconsXLarge.map(name => (
              <li key={name}>
                <JIcon
                  name={name}
                  color={allIconsListColorSelectValue}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className='title'>Colored</h2>
          <ul className='icons-list'>
            {iconsColored.map(name => (
              <li key={name}>
                <JIcon
                  name={name}
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    )
  })
