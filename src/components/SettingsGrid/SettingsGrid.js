// @flow

import React, { PureComponent } from 'react'
import SettingsGridCard from 'components/SettingsGrid/SettingsGridCard'

type Props = {|
  +children: Array<?React$Element<typeof SettingsGridCard>>,
|}

class SettingsGrid extends PureComponent<Props, *> {
  render() {
    const { children } = this.props

    return (
      <ul className='j-grid'>
        {children.map(card => (
          !card ? null : (
            <li className='box' key={`settings-card-${card.props.path}`}>
              {card}
            </li>
          )
        ))}
      </ul>
    )
  }
}

export default SettingsGrid
