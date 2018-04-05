/* @flow */

import React from 'react'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import { compose, values, map, dissoc } from 'ramda'

import Item from './Item'
import JIcon from '../JIcon'

type Token = {
  type: 'token',
  items: Array<{
    id: string | number,
    icon: string,
    title: string,
    description: string,
  }>
}

type Props = {
  title: string,
  isOpen: bool,
  content: Token,
  selectedItemId: number,
  open: () => void,
  close: () => void,
  onItemSelect: (itemId: number) => void,
}

const renderSelectionList = (
  type,
  items,
  onItemSelect,
  selectedItemId,
) => compose(
  map(item => (
    <Item
      key={item.id}
      type={type}
      onClick={onItemSelect}
      {...item}
    />
  )),
  values,
  dissoc(selectedItemId)
)(items)

const JSelect = ({
  open,
  close,
  title,
  isOpen,
  content,
  onItemSelect,
  selectedItemId,
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
        {renderSelectionList(
          content.type,
          content.items,
          onItemSelect,
          selectedItemId
        )}
      </Scrollbars>
    </div>
  </div>
)

export default JSelect
