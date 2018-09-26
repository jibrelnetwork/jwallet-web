// @flow

import React from 'react'

import JFlatButton from 'components/base/JFlatButton'

type Props = {|
  +isMnemonic: boolean,
|}

const WalletActions = ({ isMnemonic }: Props) => (
  <div className='wallet-actions'>
    <JFlatButton onClick={console.log} label='Rename' color='white' />
    <JFlatButton onClick={console.log} label='Backup' color='white' />
    {!isMnemonic && (
      <JFlatButton
        onClick={console.log}
        color='white'
        label='Edit'
      />
    )}
    <JFlatButton onClick={console.log} label='Delete' color='white' />
  </div>
)

export default WalletActions
