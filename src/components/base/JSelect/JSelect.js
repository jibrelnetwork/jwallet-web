import React from 'react'
import classNames from 'classnames'
import { withState, withHandlers } from 'recompose'
import { compose, values, map, dissoc } from 'ramda'

import Item from './Item'
import './JSelect.scss'

type Props = {
  items: Array<{
    id: string | number,
    icon: string,
    title: string,
    description: string,
  }>,
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
  isOpen,
  onItemSelect,
  selectedItemId,
}: Props) => (
  <div className={classNames('JSelect', { '-open': isOpen })}>
    <div className='selected-item'>
      <Item
        active={isOpen}
        onClick={isOpen ? close : open}
        {...items[selectedItemId]}
      />
    </div>
    {isOpen && (
      <div className='selection-list'>
        {renderSelectionList(items, onItemSelect, selectedItemId)}
      </div>
    )}
  </div>
)

export default compose(
  withState('isOpen', 'toggle', false),
  withHandlers({
    open: ({ toggle }) => () => toggle(true),
    close: ({ toggle }) => () => toggle(false),
  }),
  withHandlers({
    onItemSelect: ({ onItemSelect, close }) =>
      (itemId) => {
        close()
        onItemSelect(itemId)
      },
  }),
)(JSelect)
