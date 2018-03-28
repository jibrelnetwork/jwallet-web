/* @flow */

import cx from 'classnames'
import React from 'react'

import { JIcon, JText } from '../.'

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
        <JText
          value={text}
          variants={['normal', 'white', 'bold']}
        />
      </div>
      <div className='description'>
        <JText
          value={description}
          variants={['normal', 'white', 'bold']}
        />
      </div>
    </div>
  </div>
)

type Props = {
  text: string,
  index: number,
  checked?: boolean,
  description: string,
  onCheck: Function,
}

JRadioButton.defaultProps = {
  checked: false,
}

export default JRadioButton
