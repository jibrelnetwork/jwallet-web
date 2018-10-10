// @flow

import React from 'react'

import HelpText from 'components/HelpText'
import { JFlatButton, JInput, JRaisedButton } from 'components/base'

const NameStep = ({
  setName,
  setNextStep,
  goToWallets,
  invalidFields,
  name,
}: Props) => (
  <div className='form'>
    <div className='help'>
      <HelpText text='Set name of the wallet' />
    </div>
    <JInput
      onChange={setName}
      value={name}
      errorMessage={invalidFields.name}
      type='text'
      color='white'
      name='wallet-name'
      placeholder='routes.createWallet.placeholder.name'
    />
    <div className='actions'>
      <JFlatButton
        onClick={goToWallets}
        iconName='arrow'
        iconSize='small'
        iconColor='white'
        label='routes.createWallet.buttonTitle.prevStep'
        isTransparent
      />
      <div className='next'>
        <JRaisedButton
          onClick={setNextStep}
          color='blue'
          label='routes.createWallet.buttonTitle.nextStep'
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setName: Function,
  setNextStep: Function,
  goToWallets: Function,
  invalidFields: FormFields,
  name: string,
}

export default NameStep
