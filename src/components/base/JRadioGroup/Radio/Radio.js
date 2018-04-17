// @flow

import cx from 'classnames'
import React from 'react'

import { JIcon, JText } from 'components/base'

const Radio = ({ text, checked, onCheck, description }: Props) => (
  <div onClick={onCheck} className={cx('Radio', { '-checked': checked })}>
    <div className='icon'>
      {checked && <JIcon name='checkbox-blue' size='small' />}
    </div>
    <div className='content'>
      <div className='text'>
        <JText value={text} />
      </div>
      <div className='description'>
        <JText value={description} />
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

Radio.defaultProps = {
  checked: false,
}

export default Radio
