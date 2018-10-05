// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JInput, JRaisedButton } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangeName: Function,
  +invalidFields: FormFields,
  +valueName: string,
  +isLoading: boolean,
|}

const WalletNameStep = ({
  onSubmit,
  onChangeName,
  invalidFields,
  valueName,
  isLoading,
}: Props) => (
  <form className='wallet-name-step' onSubmit={ignoreEvent(onSubmit)()}>
    <JInput
      onChange={onChangeName}
      value={valueName}
      errorMessage={invalidFields.name}
      color='white'
      placeholder='Wallet name'
      name='wallet-name'
    />
    <div className='actions'>
      <JRaisedButton
        onClick={onSubmit}
        color='blue'
        label='Next step'
        loaderColor='white'
        isLoading={isLoading}
        isWide
      />
    </div>
  </form>
)

export default WalletNameStep
