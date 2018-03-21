import React from 'react'

import { JText } from '../../base/__new__'
import { ESCButton } from '..'

const ModalHeader = ({
  color,
  title,
  totalSteps,
  currentStep,
}: Props) => (
  <div className='modalHeader' >
    <div className='title'>
      <JText
        value={currentStep && totalSteps
          ? `${title} ${currentStep}/${totalSteps}`
          : title}
        variants={['header-2', color]}
      />
    </div>
    <div className='button'>
      <ESCButton color={color} />
    </div>
  </div>
)

type Props = {
  color: 'white' | 'gray',
  title: string,
  totalSteps?: number,
  currentStep?: number,
}

ModalHeader.defaultProps = {
  totalSteps: undefined,
  currentStep: undefined,
}

export default ModalHeader
