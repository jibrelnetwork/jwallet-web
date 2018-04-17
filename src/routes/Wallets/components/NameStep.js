// @flow

import React from 'react'

import { JButton, JFlatButton, JInput } from 'components/base'

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
      <JFlatButton
        onClick={goToWallets}
        iconName='arrow'
        text='routes.createWallet.buttonTitle.prevStep'
        transparent
      />
      <div className='next'>
        <JButton
          onClick={setNextStep}
          color='blue'
          text='routes.createWallet.buttonTitle.nextStep'
          wide
        />
      </div>
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
