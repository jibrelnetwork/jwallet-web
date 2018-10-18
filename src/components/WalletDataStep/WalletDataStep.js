// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JInput, JRaisedButton } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangeData: Function,
  +onChangePassphrase: Function,
  +onChangeDerivationPath: Function,
  +invalidFields: FormFields,
  +valueData: string,
  +valuePassphrase: string,
  +valueDerivationPath: string,
  +isLoading: boolean,
  +isMnemonic: boolean,
|}

const WalletDataStep = ({
  onSubmit,
  onChangeData,
  onChangePassphrase,
  onChangeDerivationPath,
  invalidFields,
  valueData,
  valuePassphrase,
  valueDerivationPath,
  isLoading,
  isMnemonic,
}: Props) => (
  <form className='wallet-data-step' onSubmit={ignoreEvent(onSubmit)()}>
    <JInput
      onChange={onChangeData}
      value={valueData}
      errorMessage={invalidFields.data}
      type='text'
      color='white'
      name='wallet-data'
      placeholder='Address, Private key, BIP32 XPUB, Mnemonic'
    />
    {isMnemonic && [
      <JInput
        key='passphrase'
        onChange={onChangePassphrase}
        value={valuePassphrase}
        errorMessage={invalidFields.passphrase}
        color='white'
        name='wallet-passphrase'
        placeholder='BIP39 Mnemonic passphrase (optional)'
      />,
      <JInput
        key='derivation-path'
        onChange={onChangeDerivationPath}
        value={valueDerivationPath}
        errorMessage={invalidFields.derivationPath}
        color='white'
        name='wallet-derivation-path'
        placeholder='Derivation path (optional)'
      />,
    ]}
    <div className='actions'>
      <JRaisedButton
        onClick={onSubmit}
        color='blue'
        loaderColor='white'
        label='Next step'
        isLoading={isLoading}
        isWide
      />
    </div>
  </form>
)

export default WalletDataStep
