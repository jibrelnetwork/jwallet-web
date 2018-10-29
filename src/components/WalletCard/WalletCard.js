// @flow

import React, { PureComponent } from 'react'

import { WalletFace, WalletLoading } from 'components'

type WalletCardHandler = () => void

type Props = {|
  +backup: ?WalletCardHandler,
  +rename: ?WalletCardHandler,
  +remove: ?WalletCardHandler,
  +setActive: WalletCardHandler,
  +title: string,
  +type: WalletType,
  +description: string,
  +isLoading: boolean,
  +isReadOnly: boolean,
|}

const WALLET_TYPE_ICON_MAP: { [WalletType]: string } = {
  'mnemonic': 'multy',
  'address': 'binding',
}

class WalletCard extends PureComponent<Props> {
  static defaultProps = {
    backup: null,
    rename: null,
    remove: null,
    isLoading: false,
    isReadOnly: false,
  }

  render() {
    const {
      backup,
      rename,
      remove,
      setActive,
      type,
      title,
      description,
      isLoading,
      isReadOnly,
    }: Props = this.props

    const iconName: string = WALLET_TYPE_ICON_MAP[type]

    if (isLoading) {
      return <WalletLoading />
    }

    return (
      <WalletFace
        onClick={setActive}
        backup={backup}
        rename={rename}
        remove={remove}
        title={title}
        iconName={iconName}
        description={description}
        isReadOnly={isReadOnly}
        hasActions
      />
    )
  }
}

export default WalletCard
