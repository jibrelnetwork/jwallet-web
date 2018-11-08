// @flow

import React, { PureComponent } from 'react'
import Tooltip from 'rc-tooltip'

import { JText } from 'components/base'

type Props = {|
  +text: string,
  +children: React$Node,
|}

class JTooltip extends PureComponent<Props> {
  render() {
    const {
      text,
      children,
    } = this.props

    return (
      <div className='j-tooltip'>
        <Tooltip
          overlay={(
            <JText
              value={text}
              size='small'
              color='white'
              weight='bold'
            />
          )}
          placement='top'
        >
          <div>{children}</div>
        </Tooltip>
      </div>
    )
  }
}

export default JTooltip
