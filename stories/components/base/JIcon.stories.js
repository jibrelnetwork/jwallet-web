// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../../src/components/base/JIcon'

const filesSmall = require.context(
  '../../../src/public/assets/icons/sprite-pack/small',
  true,
  /.*\.svg$/
)
const iconsSmall = filesSmall.keys().map(
  x => filesSmall(x).default).reduce((result, { id, url }
) => ({ ...result, [id]: url }), {})

const filesMedium = require.context(
  '../../../src/public/assets/icons/sprite-pack/medium',
  true,
  /.*\.svg$/
)
const iconsMedium = filesMedium.keys().map(
  x => filesMedium(x).default).reduce((result, { id, url }
) => ({ ...result, [id]: url }), {})

const filesLarge = require.context(
  '../../../src/public/assets/icons/sprite-pack/large',
  true,
  /.*\.svg$/
)
const iconsLarge = filesLarge.keys().map(
  x => filesLarge(x).default).reduce((result, { id, url }
) => ({ ...result, [id]: url }), {})

const filesXLarge = require.context(
  '../../../src/public/assets/icons/sprite-pack/xlarge',
  true,
  /.*\.svg$/
)
const iconsXLarge = filesXLarge.keys().map(
  x => filesXLarge(x).default).reduce((result, { id, url }
) => ({ ...result, [id]: url }), {})

const cellh = {
  textAlign: 'left',
  padding: '10px 15px',
}

const cell = {
  padding: '10px 15px',
  stoke: '#000',
  stroke: '#0058d2',
}

const title = {
  fontSize: '16px',
  padding: '10px 15px',
}

storiesOf('JIcon')
  .add('Small sizes', () => (
    <div>
      <h2 style={title}>Icon size: medium</h2>
      <table>
        <thead>
          <tr>
            <th style={cellh}>Icon view</th>
            <th style={cellh}>Icon name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(iconsSmall).map((item: string) => (
            <tr key={item}>
              <td style={cell}><JIcon name={iconsSmall[item]} size='small' /></td>
              <td style={cell}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('Medium sizes', () => (
    <div>
      <h2 style={title}>Icon size: medium</h2>
      <table>
        <thead>
          <tr>
            <th style={cellh}>Icon view</th>
            <th style={cellh}>Icon name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(iconsMedium).map((item: string) => (
            <tr key={item}>
              <td style={cell}><JIcon name={iconsMedium[item]} size='medium' /></td>
              <td style={cell}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('Large sizes', () => (
    <div>
      <h2 style={title}>Icon size: medium</h2>
      <table>
        <thead>
          <tr>
            <th style={cellh}>Icon view</th>
            <th style={cellh}>Icon name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(iconsLarge).map((item: string) => (
            <tr key={item}>
              <td style={cell}><JIcon name={iconsLarge[item]} size='large' /></td>
              <td style={cell}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('XLarge sizes', () => (
    <div>
      <h2 style={title}>Icon size: medium</h2>
      <table>
        <thead>
          <tr>
            <th style={cellh}>Icon view</th>
            <th style={cellh}>Icon name</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(iconsXLarge).map((item: string) => (
            <tr key={item}>
              <td style={cell}><JIcon name={iconsXLarge[item]} size='xlarge' /></td>
              <td style={cell}>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
