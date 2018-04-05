import React from 'react'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import JText from '../JText'

type Props = {
  text: string,
  children: React.Node,
}

const JTooltip = ({ text, children }: Props) => (
  <div className='jTooltip'>
    <Tooltip
      overlay={(
        <JText
          value={text}
          variants={['white', 'mini']}
        />
      )}
      placement='right'
    >
      <div>{children}</div>
    </Tooltip>
  </div>
)

export default JTooltip
