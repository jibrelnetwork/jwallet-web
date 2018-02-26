// @flow

import React from 'react'

import JButton from 'components/base/JButton'

const AssetsStep = ({ setNextStep }: Props) => (
  <div className='create-wallet-step-assets'>
    <div>{'Popular assets'}</div>
    <JButton onClick={setNextStep} label={i18n('routes.createWallet.buttonTitle.finish')} blue />
  </div>
)

type Props = {
  setNextStep: () => Dispatch,
}

export default AssetsStep
