// @flow

import React from 'react'

import WalletStep from 'components/WalletStep'
import { JInput } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangeName: Function,
  +invalidFields: FormFields,
  +valueName: string,
  +buttonLabel: string,
  +isLoading: boolean,
|}

const WalletNameStep = ({
  onSubmit,
  onChangeName,
  invalidFields,
  valueName,
  buttonLabel,
  isLoading,
}: Props) => (
  <WalletStep
    onSubmit={onSubmit}
    buttonLabel={buttonLabel}
    isLoading={isLoading}
  >
    <JInput
      onChange={onChangeName}
      value={valueName}
      errorMessage={invalidFields.name}
      color='white'
      name='wallets-name'
      placeholder='Wallet name'
      isAutoFocus
    />
  </WalletStep>
)

export default WalletNameStep
