// @flow

import classNames from 'classnames'
import React, { Fragment } from 'react'
import { t } from 'ttag'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'

import MenuPanelActionsItem from '../../Actions/Item'
import MenuPanelWalletManagerDetailsActions from './Actions'
import MenuPanelWalletManagerDetailsAddresses from './Addresses'

type Props = {|
  +getMoreAddresses: () => void,
  +setActiveAddress: (Index) => void,
  +addresses: Address[],
  +addressNames: AddressNames,
  +type: WalletType,
  +currentAddressIndex: ?Index,
  +isActive: boolean,
  +isReadOnly: boolean,
  +isSimplified: boolean,
|}

function MenuPanelWalletManagerDetails({
  getMoreAddresses,
  setActiveAddress,
  addresses,
  addressNames,
  type,
  currentAddressIndex,
  isActive,
  isReadOnly,
  isSimplified,
}: Props) {
  const isMnemonic: boolean = checkMnemonicType(type) && !isSimplified

  return (
    <div
      className={classNames(
        'menu-panel-wallet-manager-details',
        isActive && '-active',
        isMnemonic && '-mnemonic',
        isReadOnly && '-read-only',
      )}
    >
      {!isMnemonic ? <MenuPanelWalletManagerDetailsActions /> : (
        <Fragment>
          <MenuPanelWalletManagerDetailsAddresses
            getMoreAddresses={getMoreAddresses}
            setActiveAddress={setActiveAddress}
            addresses={addresses}
            addressNames={addressNames}
            currentAddressIndex={currentAddressIndex}
          />
          <div className='action'>
            <MenuPanelActionsItem
              icon='setting'
              path='/wallets'
              label={t`Manage wallets`}
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default MenuPanelWalletManagerDetails
