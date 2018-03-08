// @flow

import React from 'react'

import JButton from 'components/base/JButton'

const FormStep = ({ setNextStep }: Props) => (
  <div className='backup-wallet-form-step'>
    {'Some text about backup'}
    <JButton onClick={setNextStep} label='Backup' blue />
  </div>
)

type Props = {
  setNextStep: () => Dispatch,
}

export default FormStep
