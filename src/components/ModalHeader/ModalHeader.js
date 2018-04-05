// @flow

import React from 'react'

import JText from '../base/JText'
import ESCButton from '../ESCButton'

const ModalHeader = ({
  color,
  title,
  totalSteps,
  currentStep,
  withMenu,
}: Props) => (
  <div className='modal-header'>
    <div className='title'>
      <JText
        value={currentStep && totalSteps
          ? `${title} ${currentStep}/${totalSteps}`
          : title}
        variants={[color, 'header-title', withMenu ? 'header-menu-title' : null]}
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
  withMenu?: boolean,
}

ModalHeader.defaultProps = {
  totalSteps: undefined,
  currentStep: undefined,
  withMenu: false,
}

export default ModalHeader
