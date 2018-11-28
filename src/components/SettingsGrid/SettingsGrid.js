// @flow

import React, { PureComponent } from 'react'

import Card from './Card'

import type { SettingsCard } from './Card/Card'

type Props = {|
  +items: Array<SettingsCard>,
|}

class SettingsGrid extends PureComponent<Props, *> {
  render() {
    const { items } = this.props

    return (
      <ul className='j-grid'>
        {items.map(cardProps => (
          <li className='box' key={`settings-card-${cardProps.path}`}>
            <Card {...cardProps} />
          </li>
        ))}
      </ul>
    )
  }
}

export default SettingsGrid
