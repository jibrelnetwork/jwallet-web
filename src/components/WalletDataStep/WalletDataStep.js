// @flow

import React, { Fragment } from 'react'
import { t } from 'ttag'

import WalletStep from 'components/WalletStep'
import { JInput } from 'components/base'
import { JTextArea } from 'components/JTextArea'
import { ErrorMessage } from 'components/base/ErrorMessage'
import { handleTargetValue } from 'utils/eventHandlers'

import WalletDataStepStyle from './WallletDataStep.m.scss'

type Props = {|
  +onSubmit: Function,
  +onChangeData: Function,
  +onChangeDerivationPath: Function,
  +title: ?string[],
  +invalidFields: FormFields,
  +valueData: string,
  +buttonLabel: string,
  +valueDerivationPath: string,
  +isLoading: boolean,
  +isMnemonic: boolean,
|}

const WalletDataStep = ({
  onSubmit,
  onChangeData,
  onChangeDerivationPath,
  title,
  invalidFields,
  valueData,
  buttonLabel,
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
    <Fragment>
      <JTextArea
        className={invalidFields.data && `${WalletDataStepStyle.with} ${WalletDataStepStyle.error}`}
        onChange={handleTargetValue(onChangeData)}
        value={valueData}
        color='white'
        name='wallet-data'
        placeholder={t`Address, Private key, BIP32 XPUB, Mnemonic`}
        rows={2}
        autoFocus
      />
      {invalidFields.data && <ErrorMessage message={invalidFields.data} theme='error' />}
    </Fragment>
    {isMnemonic && (
      <Fragment>
        <JInput
          onChange={onChangeDerivationPath}
          value={valueDerivationPath}
          errorMessage={invalidFields.derivationPath}
          color='white'
          name='wallet-derivation-path'
          placeholder={t`Derivation path (optional)`}
        />
      </Fragment>
    )}
  </WalletStep>
)

export default WalletDataStep
