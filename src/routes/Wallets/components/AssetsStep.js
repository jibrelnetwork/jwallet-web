// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import JButton from 'components/base/JButton'
import DigitalAssets from 'components/DigitalAssets'

const AssetsStep = ({ goToHome }: Props) => (
  <div className='form'>
    <div className='assets'>
      <Scrollbars autoHide>
        <DigitalAssets type='popular' color='blue' />
      </Scrollbars>
    </div>
    <div className='actions'>
      <div className='next'>
        <JButton
          onClick={goToHome}
          color='blue'
          text='routes.createWallet.buttonTitle.finish'
          wide
        />
      </div>
    </div>
  </div>
)

type Props = {
  goToHome: () => Dispatch,
}

AssetsStep.defaultProps = {
  goToHome: () => {},
}

export default AssetsStep
