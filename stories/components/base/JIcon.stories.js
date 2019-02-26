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
  x => filesSmall(x).default).reduce((result, { id, url, viewBox }
) => ({ ...result, [id]: { url, viewBox } }), {})

const filesMedium = require.context(
  '../../../src/public/assets/icons/sprite-pack/medium',
  true,
  /.*\.svg$/
)
const iconsMedium = filesMedium.keys().map(
  x => filesMedium(x).default).reduce((result, { id, url, viewBox }
) => ({ ...result, [id]: { url, viewBox } }), {})

const filesLarge = require.context(
  '../../../src/public/assets/icons/sprite-pack/large',
  true,
  /.*\.svg$/
)
const iconsLarge = filesLarge.keys().map(
  x => filesLarge(x).default).reduce((result, { id, url, viewBox }
) => ({ ...result, [id]: { url, viewBox } }), {})

const filesXLarge = require.context(
  '../../../src/public/assets/icons/sprite-pack/xlarge',
  true,
  /.*\.svg$/
)
const iconsXLarge = filesXLarge.keys().map(
  x => filesXLarge(x).default).reduce((result, { id, url, viewBox }
) => ({ ...result, [id]: { url, viewBox } }), {})

storiesOf('JIcon')
  .add('Small sizes', () => (
    <div>
      <h2 className='title'>Icon size: medium</h2>
      <table className='custom-table'>
        <thead className='thead'>
          <tr className='row'>
            <th className='cell'>Icon view</th>
            <th className='cell'>Icon name</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {Object.keys(iconsSmall).map((item: string) => (
            <tr className='row' key={item}>
              <td className='cell'><JIcon name={item.replace('-usage', '')} /></td>
              <td className='cell'>{item.replace('-usage', '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('Medium sizes', () => (
    <div>
      <h2 className='title'>Icon size: medium</h2>
      <table className='custom-table'>
        <thead className='thead'>
          <tr className='row'>
            <th className='cell'>Icon view</th>
            <th className='cell'>Icon name</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {Object.keys(iconsMedium).map((item: string) => (
            <tr className='row' key={item}>
              <td className='cell'><JIcon name={item.replace('-usage', '')} /></td>
              <td className='cell'>{item.replace('-usage', '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('Large sizes', () => (
    <div>
      <h2 className='title'>Icon size: medium</h2>
      <table className='custom-table'>
        <thead className='thead'>
          <tr className='row'>
            <th className='cell'>Icon view</th>
            <th className='cell'>Icon name</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {Object.keys(iconsLarge).map((item: string) => (
            <tr className='row' key={item}>
              <td className='cell'><JIcon name={item.replace('-usage', '')} /></td>
              <td className='cell'>{item.replace('-usage', '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('XLarge sizes', () => (
    <div>
      <h2 className='title'>Icon size: medium</h2>
      <table className='custom-table'>
        <thead className='thead'>
          <tr className='row'>
            <th className='cell'>Icon view</th>
            <th className='cell'>Icon name</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          {Object.keys(iconsXLarge).map((item: string) => (
            <tr className='row' key={item}>
              <td className='cell'><JIcon name={item.replace('-usage', '')} /></td>
              <td className='cell'>{item.replace('-usage', '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ))
  .add('Demo', () => (
    <div>
      <h2 className='title'>Icon size: medium</h2>
      <table className='custom-table'>
        <thead className='thead'>
          <tr className='row'>
            <th className='cell'>Icon view</th>
            <th className='cell'>Icon name</th>
            <th className='cell'>Type of staining</th>
            <th className='cell'>Change color</th>
            <th className='cell'>Demo</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          <tr className='row'>
            <td className='cell'>
              <span className='demo-icon'><JIcon name='add' color='white' /></span>
              <span className='demo-icon'><JIcon name='add' color='blue' /></span>
              <span className='demo-icon'><JIcon name='add' color='gray' /></span>
              <span className='demo-icon'><JIcon name='add' color='sky' /></span>
              <span className='demo-icon'><JIcon name='add' color='red' /></span>
              <span className='demo-icon'><JIcon name='add' color='black' /></span>
            </td>
            <td className='cell'>add</td>
            <td className='cell'>Props: white | blue | gray | sky | red | black</td>
            <td className='cell'>Only js event</td>
          </tr>
          <tr className='row'>
            <td className='cell'>
              <span className='demo-icon -white'><JIcon name='add' /></span>
              <span className='demo-icon -blue'><JIcon name='add' /></span>
              <span className='demo-icon -gray'><JIcon name='add' /></span>
              <span className='demo-icon -sky'><JIcon name='add' /></span>
              <span className='demo-icon -red'><JIcon name='add' /></span>
              <span className='demo-icon -black'><JIcon name='add' /></span>
            </td>
            <td className='cell'>add</td>
            <td className='cell'>Inheritance from parent through stroke</td>
            <td className='cell'>Best Practice - Inheritance from parent through styles</td>
            <td className='cell'>
              <span className='demo-icon -blue -h-sky'><JIcon name='add' /></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ))
