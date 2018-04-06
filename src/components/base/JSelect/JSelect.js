// @flow

import React from 'react'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import JIcon from 'components/base//JIcon'

import Item from './Item'

const JSelect = ({
  open,
  close,
  content,
  title,
  selectedItemId,
  isOpen,
}: Props) => (
  <div className={classNames('JSelect', { '-open': isOpen })}>
    <div className='selected-item'>
      <div className='item'>
        <Item
          type={content.type}
          header={title}
          active={isOpen}
          onClick={isOpen ? close : open}
          selected
          {...content.items[selectedItemId]}
        />
      </div>
      <div className='expand'>
        <JIcon
          name='expand-gray'
          size='small'
        />
      </div>
    </div>
    <div className='selection-list'>
      <Scrollbars autoHide>
      </Scrollbars>
    </div>
  </div>
)

type Token = {
  items: Array<{
    id: string | number,
    icon: string,
    title: string,
    description: string,
  }>,
  type: 'token',
}

type Props = {
  open: () => void,
  close: () => void,
  onItemSelect: (itemId: number) => void,
  content: Token,
  title: string,
  selectedItemId: number,
  isOpen: bool,
}

export default JSelect
