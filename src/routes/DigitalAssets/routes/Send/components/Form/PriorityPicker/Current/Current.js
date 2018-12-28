// @flow

import React from 'react'

import JText from 'components/base/JText'

type Props = {|
  +currentPriority: string,
|}

function DigitalAssetsSendFormPriorityPickerCurrent({ currentPriority }: Props) {
  return (
    <div className='digital-assets-send-form-priority-picker-current'>
      <div className='label'>
        <JText
          size='small'
          color='gray'
          value='Priority'
          whiteSpace='wrap'
        />
      </div>
      <div className='value'>
        <JText
          value={currentPriority}
          color='gray'
          weight='bold'
          size='semilarge'
          whiteSpace='wrap'
        />
      </div>
    </div>
  )
}

export default DigitalAssetsSendFormPriorityPickerCurrent
