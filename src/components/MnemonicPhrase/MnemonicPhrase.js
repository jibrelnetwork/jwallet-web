// @flow

import React from 'react'

import JText from 'components/base/JText'
import OverlayActions from 'components/OverlayActions'

const MnemonicPhrase = ({ copy, download, mnemonic }: Props) => (
  <div className='mnemonic-phrase'>
    <div className='mnemonic'>
      <JText
        value={mnemonic}
        color='blue'
        align='center'
        size='mnemonic'
        whiteSpace='wrap'
      />
    </div>
    <div className='overlay'>
      <OverlayActions
        copy={copy}
        load={download}
        loadLabel='Download as TXT'
        copyLabel='Copy backup phrase'
      />
    </div>
  </div>
)

type Props = {
  copy: Function,
  download: Function,
  mnemonic: string,
}

export default MnemonicPhrase
