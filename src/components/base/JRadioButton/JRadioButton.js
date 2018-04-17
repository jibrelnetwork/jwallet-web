// @flow

import cx from 'classnames'
import React from 'react'

import { JIcon, JText } from 'components/base'

const JRadioButton = ({
  text,
  checked,
  onCheck,
  description,
}: Props) => (
  <div
    onClick={onCheck}
    className={cx('JRadioButton', { '-checked': checked })}
  >
    <div className='icon'>
      {checked && <JIcon name='checkbox-blue' size='small' />}
    </div>
    <div className='content'>
      <div className='text'>
        <JText value={text} weight='bold' />
      </div>
      <div className='description'>
        <JText value={description} weight='bold' />
      </div>
    </div>
  </div>
)

type Props = {
  onCheck: Function,
  text: string,
  description: string,
  index: number,
  checked: boolean,
}

JRadioButton.defaultProps = {
  onCheck: () => {},
  text: '',
  description: '',
  index: 0,
  checked: false,
}

export default JRadioButton
