/* @flow */

import cx from 'classnames'
import React from 'react'

import { JText, JIcon } from '../..'

type Props = {
  text: string,
  index: number,
  checked?: boolean,
  description: string,
  onCheck: Function,
}

const Radio = ({
  text,
  checked,
  onCheck,
  description,
}: Props) => (
  <div
    onClick={onCheck}
    className={cx('Radio', { '-checked': checked })}
  >
    <div className='icon'>
      {checked && <JIcon name='checkbox-blue' size='small' />}
    </div>
    <div className='content'>
      <div className='text'>
        <JText
          value={text}
          variants={['normal', 'white']}
        />
      </div>
      <div className='description'>
        <JText
          value={description}
          variants={['normal', 'white']}
        />
      </div>
    </div>
  </div>
)

Radio.defaultProps = {
  checked: false,
}

export default Radio
