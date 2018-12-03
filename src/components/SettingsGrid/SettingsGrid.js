// @flow

import React, { PureComponent, Children } from 'react'

type Props = {|
  +children: Array<React$Node>,
|}

class SettingsGrid extends PureComponent<Props, *> {
  render() {
    const { children } = this.props
    const { map: childrenMap } = Children

    return (
      <ul className='j-grid'>
        {childrenMap(children, (card, index) => (
          <li className='box' key={`settings-card-${index}`}>
            {card}
          </li>
        ))}
      </ul>
    )
  }
}

export default SettingsGrid
