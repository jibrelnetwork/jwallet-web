// @flow

import React from 'react'
import { JThumbnail, JRaisedButton } from 'react-components'

const FormStep = ({ setNextStep }: Props) => (
  <div className='form'>
    <JThumbnail
      image='key'
      color='white'
      title='Backup current wallet'
      description={'All user data, including imported or generated ' +
        'private keys are stored locally, meaning your private'}
    />
    <div className='actions'>
      <JRaisedButton
        onClick={setNextStep}
        color='blue'
        label='Backup'
        isWide
      />
    </div>
  </div>
)

type Props = {
  setNextStep: Function,
}

export default FormStep
