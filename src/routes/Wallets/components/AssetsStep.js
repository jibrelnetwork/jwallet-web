// @flow

import React from 'react'
import { JRaisedButton } from 'react-components'
import { Scrollbars } from 'react-custom-scrollbars'

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
        <JRaisedButton
          onClick={goToHome}
          color='blue'
          label='routes.createWallet.buttonTitle.finish'
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  goToHome: Function,
}

export default AssetsStep
