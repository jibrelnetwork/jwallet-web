// @flow

import React from 'react'

import { JButton, JInput } from 'components/base/__new__'

const NameStep = ({
  setName,
  setNextStep,
  goToWallets,
  invalidFields,
  name,
}: Props) => (
  <div className='form'>
    <JInput
      onChange={setName}
      name='wallet-name'
      value={name}
      errorMessage={invalidFields.name}
      placeholder={i18n('routes.createWallet.placeholder.name')}
    />
    <div className='actions'>
      <JButton
        onClick={goToWallets}
        text={i18n('routes.createWallet.buttonTitle.prevStep')}
        color='white'
        iconSize='small'
        iconName='arrow-back'
        minimal
        transparent
      />
      <JButton
        onClick={setNextStep}
        text={i18n('routes.createWallet.buttonTitle.nextStep')}
        color='blue'
        large
        right
      />
    </div>
  </div>
)

type Props = {
  setName: (name: string) => Dispatch,
  setNextStep: () => Dispatch,
  goToWallets: () => Dispatch,
  invalidFields: Object,
  name: string,
}

export default NameStep
