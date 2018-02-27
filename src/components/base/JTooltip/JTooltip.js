import React from 'react'
import Tooltip from 'rc-tooltip'
import { pure } from 'recompose'
import 'rc-tooltip/assets/bootstrap.css'

import JText from '../JText'
import './JTooltip.scss'

type Props = {
  text: string,
  children: React.Node,
}

const JTooltip = ({ text, children }: Props) => (
  <div className='JTooltip'>
    <Tooltip
      placement='top'
      overlay={<JText value={text}/>}
    >
      {children}
    </Tooltip>
  </div>
)

export default pure(JTooltip)
