// @flow

import React from 'react'

import JButton from 'components/base/JButton'

const Assets = ({ setNextStep }: Props) => (
  <div className='import-wallet-step-assets'>
    <div>{'Popular assets'}</div>
    <JButton onClick={setNextStep} label={i18n('routes.importWallet.buttonTitle.finish')} blue />
  </div>
)

type Props = {
  setNextStep: () => Dispatch,
}

export default Assets
