// @flow

import React from 'react'
import { JFlatButton, JInput, JRaisedButton } from 'react-components'

import HelpText from 'components/HelpText'

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
      placeholder={i18n('routes.createWallet.placeholder.name')}
      errorMessage={invalidFields.name ? i18n(invalidFields.name) : null}
      type='text'
      color='white'
      name='wallet-name'
    />
    <div className='actions'>
      <JFlatButton
        onClick={goToWallets}
        label={i18n('routes.createWallet.buttonTitle.prevStep')}
        iconName='arrow'
        iconSize='small'
        iconColor='white'
        isTransparent
      />
      <div className='next'>
        <JRaisedButton
          onClick={setNextStep}
          label={i18n('routes.createWallet.buttonTitle.nextStep')}
          color='blue'
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
