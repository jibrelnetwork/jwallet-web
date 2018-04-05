// @flow

import React from 'react'

import { JButton, JThumbnail } from 'components/base'

const FormStep = ({ setNextStep }: Props) => (
  <div className='form'>
    <JThumbnail
      image='key'
      color='white'
      title='Backup current wallet'
      description={'All user data, including imported or generated ' +
        'private keys are stored locally, meaning your private'}
    />
    <div className='actions -center'>
      <JButton
        onClick={setNextStep}
        text='Backup'
        color='blue'
        large
      />
    </div>
  </div>
)

type Props = {
  setNextStep: () => Dispatch,
}

export default FormStep
