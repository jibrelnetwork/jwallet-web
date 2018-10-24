// @flow

import React, { Fragment } from 'react'

import WalletStep from 'components/WalletStep'
import { JInput } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangeData: Function,
  +onChangePassphrase: Function,
  +onChangeDerivationPath: Function,
  +title: ?Array<string>,
  +invalidFields: FormFields,
  +valueData: string,
  +buttonLabel: string,
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
  title,
  invalidFields,
  valueData,
  buttonLabel,
  valuePassphrase,
  valueDerivationPath,
  isLoading,
  isMnemonic,
}: Props) => (
  <WalletStep
    onSubmit={onSubmit}
    title={title}
    buttonLabel={buttonLabel}
    isLoading={isLoading}
  >
    <JInput
      onChange={onChangeData}
      value={valueData}
      errorMessage={invalidFields.data}
      type='text'
      color='white'
      name='wallet-data'
      placeholder='Address, Private key, BIP32 XPUB, Mnemonic'
      rows={2}
      isAutoFocus
    />
    {isMnemonic && (
      <Fragment>
        <JInput
          onChange={onChangePassphrase}
          value={valuePassphrase}
          errorMessage={invalidFields.passphrase}
          color='white'
          name='wallet-passphrase'
          placeholder='BIP39 Mnemonic passphrase (optional)'
        />
        <JInput
          onChange={onChangeDerivationPath}
          value={valueDerivationPath}
          errorMessage={invalidFields.derivationPath}
          color='white'
          name='wallet-derivation-path'
          placeholder='Derivation path (optional)'
        />
      </Fragment>
    )}
  </WalletStep>
)

export default WalletDataStep
