// @flow

import React from 'react'

import {
  CloseableScreen,
  PasswordStep,
} from 'components'

import { JText } from 'components/base'
import JCard from '../../../../components/base/JCard/JCard'

type Props = {|
  openView: () => void,
  closeView: () => void,
  closeClick: () => void,
  passwordSubmit: (password: string) => void,
  passwordError: string,
  isLoading: boolean,
  amount: string,
  amountCurrency: string,
  feeETH: string,
  // networkId: NetworkId,
  fromName: string,
  fromAddress: string,
  toName: string,
  toAddress: string,
|}

const DigitalAssetsSendConfirmView = ({
  openView,
  closeView,
  closeClick,
  passwordSubmit,
  passwordError,
  isLoading,
  amount,
  amountCurrency,
  feeETH,
  // networkId,
  fromName,
  fromAddress,
  toName,
  toAddress,
}: Props) => (
  <CloseableScreen
    title='Send digital asset'
    open={openView}
    close={closeView}
    closeClick={closeClick}
  >
    <div className='digital-asset-send-view'>
      <div className='form'>
        <PasswordStep
          onSubmit={passwordSubmit}
          submitLabel='Send asset'
          errorMessage={passwordError}
          placeholder='Security password'
          isLoading={isLoading}
        >
          <JCard>
            <div className='digital-assets-send-confirm'>
              <JText value={`${amount} ${amountCurrency}`} />
              <JText value={`Fee - ${feeETH}ETH`} />
              { /** spacer */ }
              <JText value={`From ${fromName}`} />
              <JText value={`${fromAddress}`} />
              <JText value={`To ${toName}`} />
              <JText value={`${toAddress}`} />
            </div>
          </JCard>
        </PasswordStep>
      </div>
    </div>
  </CloseableScreen>
)

export default DigitalAssetsSendConfirmView
