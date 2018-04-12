// @flow

import React from 'react'
import classNames from 'classnames'

import ESCButton from 'components/ESCButton'
import JText from 'components/base/JText'

const ModalHeader = ({
  color,
  title,
  totalSteps,
  currentStep,
  withMenu,
}: Props) => (
  <div className={classNames('modal-header', `-${color}`, withMenu && '-menu')}>
    <div className='content'>
      <div className='title'>
        <JText
          value={currentStep && totalSteps
            ? `${title} ${currentStep}/${totalSteps}`
            : title}
          variants={[color, 'header-title']}
        />
      </div>
      <div className='button'>
        <ESCButton color={color} />
      </div>
    </div>
  </div>
)

type Props = {
  color: 'white' | 'gray',
  title: string,
  totalSteps: number,
  currentStep: number,
  withMenu: boolean,
}

ModalHeader.defaultProps = {
  color: 'white',
  title: '',
  totalSteps: undefined,
  currentStep: undefined,
  withMenu: false,
}

export default ModalHeader
