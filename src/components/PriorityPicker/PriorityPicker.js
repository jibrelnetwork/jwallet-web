// @flow

import React, { Component } from 'react'

import JPicker, { JPickerFullItem } from 'components/base/JPicker'

import Current from './Current/PriorityPickerCurrent'

type PriorityItem = {|
  priority: TXPriority,
  title: string,
  description: string,
  fiatPrice: string,
  icon: '',
|}

const priorities: Array<PriorityItem> = [
  {
    priority: {
      type: 'HIGH',
    },
    title: 'High',
    description: 'About 30 sec',
    fiatPrice: '5.2 USD',
    icon: '',
  },
  {
    priority: {
      type: 'NORMAL',
    },
    title: 'Normal',
    description: 'About 1 min',
    fiatPrice: '3.22 USD',
    icon: '',
  },
  {
    priority: {
      type: 'LOW',
    },
    title: 'Low',
    description: 'About 15 min',
    fiatPrice: '1.22 USD',
    icon: '',
  },
  {
    priority: {
      type: 'CUSTOM',
      gas: '10000',
      gasPrice: '1000',
    },
    title: 'Custom',
    description: 'Edit GAS and GAS Price manually',
    fiatPrice: '',
    icon: '',
  },
]

type Props = {|
  selectedPriority: TXPriority,
  onSelect: (priority: TXPriority) => void,
  isDisabled: boolean,
  errorMessage: string,
|}

type ComponentState = {|
  isCustom: boolean,
|}

class PriorityPicker extends Component<Props, ComponentState> {
  static defaultProps = {
    errorMessage: '',
    isDisabled: false,
  }

  onOpen = () => {
    // reset filter
    // this.setState({ filter: '' })
  }

  render() {
    const {
      onSelect,
      isDisabled,
      errorMessage,
      selectedPriority,
    } = this.props

    const activePriority = priorities.find(
      ({ priority }) => priority.type === selectedPriority.type
    )

    const priorityValue = activePriority
      ? `${activePriority.title} — ${activePriority.fiatPrice}`
      : ''

    return (
      <div className='priority-picker'>
        <JPicker
          errorMessage={errorMessage}
          isDisabled={isDisabled}
          onOpen={this.onOpen}
          currentRenderer={() => (
            <Current
              value={priorityValue}
            />)}
        >
          {priorities.map(item => (
            <JPickerFullItem
              key={item.priority.type}
              onSelect={onSelect}
              value={item.priority}
              icon={item.icon}
              title={item.title}
              description={item.description}
              fiatBalance=''
              isSelected={selectedPriority && selectedPriority.type === item.priority.type}
            />
          ))}
        </JPicker>
      </div>
    )
  }
}

export default PriorityPicker
