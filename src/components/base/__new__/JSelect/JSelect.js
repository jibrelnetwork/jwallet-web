import React from 'react'
import classNames from 'classnames'
import { compose, values, map, dissoc } from 'ramda'

import Item from './Item'
import JIcon from '../JIcon'
import './JSelect.scss'

type Props = {
  items: Array<{
    id: string | number,
    icon: string,
    title: string,
    description: string,
  }>,
  title: string,
  isOpen: bool,
  selectedItemId: number,
  open: () => void,
  close: () => void,
  onItemSelect: (itemId: number) => void,
}

const renderSelectionList = (
  items,
  onItemSelect,
  selectedItemId,
) => compose(
  map(item => (
    <Item
      key={item.id}
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
  items,
  title,
  isOpen,
  onItemSelect,
  selectedItemId,
}: Props) => (
  <div className={classNames('JSelect', { '-open': isOpen })}>
    <div className='selected-item'>
      <div className='item'>
        <Item
          header={title}
          onClick={isOpen ? close : open}
          selected
          {...items[selectedItemId]}
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
      {renderSelectionList(items, onItemSelect, selectedItemId)}
    </div>
  </div>
)

export default JSelect
