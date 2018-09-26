// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import ESCButton from 'components/ESCButton'
import JText from 'components/base/JText'

type Props = {
  color: 'white' | 'gray',
  title: string,
  location: string,
  withMenu: boolean,
  totalSteps: number,
  currentStep: number,
}

class ModalHeader extends PureComponent<Props, *> {
  static defaultProps = {
    color: 'white',
    title: '',
    location: '/',
    withMenu: false,
    totalSteps: undefined,
    currentStep: undefined,
  }

  render() {
    const {
      color,
      title,
      location,
      withMenu,
      totalSteps,
      currentStep,
    } = this.props

    return (
      <div className={classNames('modal-header', `-${color}`, withMenu && '-menu')}>
        <div className='content'>
          <div className='title'>
            <JText
              value={currentStep && totalSteps
                ? `${title} ${currentStep}/${totalSteps}`
                : title}
              color={color}
              size='title'
            />
          </div>
          <div className='button'>
            <ESCButton color={color} locationAfterClose={location} />
          </div>
        </div>
      </div>
    )
  }
}

export default ModalHeader
