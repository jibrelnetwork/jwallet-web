// @flow

import React from 'react'
import classNames from 'classnames'

import { JPickerListItem } from './JPickerListItem'

import jPickerListStyle from './jPickerList.m.scss'

type Props = {|
  +activeItemKey: ?string,
  +onItemClick: (itemKey: string) => any,
  +children: React$Node,
|}

type ComponentState = {|
  +focusedItemKey: ?string,
|}

class JPickerList extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    focusedItemKey: null,
  }

  handleItemFocus = (itemKey: string) => () => {
    this.setState({ focusedItemKey: itemKey })
  }

  handleItemBlur = () => {
    this.setState({ focusedItemKey: null })
  }

  handleItemClick = (itemKey: string) => () => {
    if (this.props.onItemClick) {
      this.props.onItemClick(itemKey)
    }
  }

  render() {
    const {
      activeItemKey,
      children,
    } = this.props

    const {
      focusedItemKey,
    } = this.state

    const count = React.Children.count(children)

    return (
      <div
        className={classNames(
          jPickerListStyle.core,
          jPickerListStyle[`count-${count}`],
        )}
      >
        {React.Children.map(x => children(x), (child) => {
          const {
            key,
          } = child

          if (!key) {
            console.error('Invalid key for element', child)

            return null
          }

          return (
            <JPickerListItem
              key={`root-${key}`}
              isSelected={!!activeItemKey && activeItemKey === key}
              isFocused={!!focusedItemKey && focusedItemKey === key}
              onClick={this.handleItemClick(key)}
              onFocus={this.handleItemFocus(key)}
              onBlur={this.handleItemBlur}
            >
              {child}
            </JPickerListItem>
          )
        })}
      </div>
    )
  }
}

export { JPickerList }
