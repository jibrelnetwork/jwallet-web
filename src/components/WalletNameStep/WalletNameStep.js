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
  <div className='wallet-name-step'>
    <form className='form' onSubmit={ignoreEvent(onSubmit)()}>
      <JInput
        onChange={onChangeName}
        value={valueName}
        errorMessage={invalidFields.name}
        color='white'
        placeholder='Wallet name'
        name='wallets-create-name'
      />
      <div className='actions'>
        <JRaisedButton
          onClick={onSubmit}
          color='white'
          label='Next step'
          labelColor='blue'
          loaderColor='blue'
          isLoading={isLoading}
        />
      </div>
    </form>
  </div>
)

export default WalletNameStep
