// @flow

import React, { PureComponent } from 'react'

import DoubleInput from 'components/DoubleInput'
import JPicker, { JPickerFullItem } from 'components/base/JPicker'

import DigitalAssetsSendFormPriorityPickerCurrent from './Current'
import DigitalAssetsSendFormPriorityPickerInfo from './Info'

const TXPRIORITY_DATA: { [TXPriorityKey]: TXPriorityData } = {
  HIGH: {
    title: 'High',
    icon: 'priority-high',
    description: 'About 30 sec',
  },
  NORMAL: {
    title: 'Normal',
    icon: 'priority-normal',
    description: 'About 1 min',
  },
  LOW: {
    title: 'Low',
    icon: 'priority-low',
    description: 'About 15 min',
  },
  CUSTOM: {
    title: 'Custom',
    icon: 'priority-custom',
    description: 'Edit GAS and GAS Price manually',
  },
}

type Props = {|
  +onSelect: (priority: TXPriorityKey) => void,
  +setFormFieldValue: (fieldName: $Keys<DigitalAssetsSendFormFields>) => (value: string) => void,
  +selectedPriority: TXPriorityKey,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
|}

class DigitalAssetsSendFormPriorityPicker extends PureComponent<Props> {
  closeCustomOptions = () => {
    const {
      onSelect,
      setFormFieldValue,
    }: Props = this.props

    onSelect('NORMAL')
    setFormFieldValue('gasLimit')('')
    setFormFieldValue('gasPrice')('')
  }

  render() {
    const {
      onSelect,
      setFormFieldValue,
      formFieldValues,
      formFieldErrors,
      selectedPriority,
    }: Props = this.props

    const selectedPriorityData: TXPriorityData = TXPRIORITY_DATA[selectedPriority]

    return (
      <div className='digital-assets-send-form-priority-picker'>
        {(selectedPriority === 'CUSTOM') ? (
          <DoubleInput
            onClose={this.closeCustomOptions}
            items={[{
              onChange: setFormFieldValue('gasLimit'),
              value: formFieldValues.gasLimit,
              placeholder: 'Gas limit',
            }, {
              onChange: setFormFieldValue('gasPrice'),
              value: formFieldValues.gasPrice,
              placeholder: 'Gas price (gwei)',
            }]}
            errorMessage={formFieldErrors.gasLimit || formFieldErrors.gasPrice}
          />
        ) : (
          <JPicker
            errorMessage={formFieldErrors.gasLimit || formFieldErrors.gasPrice}
            bottomRenderer={() => (
              <DigitalAssetsSendFormPriorityPickerInfo value={[
                'The app doesn’t charge you any fees.',
                'But you have to pay the blokchain fee to create a newtransaction.',
              ]}
              />
            )}
            currentRenderer={() => (
              <DigitalAssetsSendFormPriorityPickerCurrent
                currentPriority={selectedPriorityData.title}
              />
            )}
          >
            {Object.keys(TXPRIORITY_DATA).map((priorityKey: TXPriorityKey) => {
              const {
                icon,
                title,
                description,
              }: TXPriorityData = TXPRIORITY_DATA[priorityKey]

              return (
                <JPickerFullItem
                  key={priorityKey}
                  onSelect={onSelect}
                  icon={icon}
                  title={title}
                  value={priorityKey}
                  description={description}
                  isSelected={selectedPriority === priorityKey}
                />
              )
            })}
          </JPicker>
        )}
      </div>
    )
  }
}

export default DigitalAssetsSendFormPriorityPicker
