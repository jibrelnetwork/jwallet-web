// @flow

import classNames from 'classnames'
import React, { Fragment } from 'react'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'

import MenuPanelActionsItem from '../../Actions/Item'
import MenuPanelWalletManagerDetailsActions from './Actions'
import MenuPanelWalletManagerDetailsAddresses from './Addresses'

type Props = {|
  +setActiveAddress: () => void,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +type: WalletType,
  +isActive: boolean,
|}

function MenuPanelWalletManagerDetails({
  setActiveAddress,
  addresses,
  addressNames,
  type,
  isActive,
}: Props) {
  const isMnemonic: boolean = checkMnemonicType(type)

  return (
    <div
      className={classNames(
        'menu-panel-wallet-manager-details',
        isActive && '-active',
        isMnemonic && '-mnemonic',
      )}
    >
      {!isMnemonic ? <MenuPanelWalletManagerDetailsActions /> : (
        <Fragment>
          <MenuPanelWalletManagerDetailsAddresses
            setActiveAddress={setActiveAddress}
            addresses={addresses}
            addressNames={addressNames}
          />
          <div className='action'>
            <MenuPanelActionsItem
              icon='setting'
              path='/wallets'
              label='Manage wallets'
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default MenuPanelWalletManagerDetails
