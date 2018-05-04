// @flow

import React from 'react'
import classNames from 'classnames'
import { JCheckbox, JFlatButton, JRaisedButton, JText } from 'react-components'

import MnemonicPhrase from 'components/MnemonicPhrase'

const MnemonicStep = ({
  setPrevStep,
  setNextStep,
  copyMnemonic,
  saveMnemonic,
  mnemonic,
}: Props) => (
  <div className='form'>
    <MnemonicPhrase copy={copyMnemonic} download={saveMnemonic} mnemonic={mnemonic} />
    <div className={classNames('conditions', /* isActive &&  */ '-active')}>
      <JCheckbox toggle={console.log} name='warning-one' isActive>
        <JText
          color='white'
          whiteSpace='wrap'
          value={'I understand that if I lose the backup phrase - ' +
            'I can not restore access to my funds'}
        />
      </JCheckbox>
      <JCheckbox toggle={console.log} name='warning-two' isActive>
        <JText
          color='white'
          whiteSpace='wrap'
          value={'I understand that if anyone get access to my backup phrase - ' +
            'my funds can be stolen'}
        />
      </JCheckbox>
    </div>
    <div className='actions'>
      <JFlatButton
        onClick={setPrevStep}
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
          label='routes.createWallet.buttonTitle.save'
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setNextStep: Function,
  setPrevStep: Function,
  copyMnemonic: Function,
  saveMnemonic: Function,
  mnemonic: string,
}

export default MnemonicStep
