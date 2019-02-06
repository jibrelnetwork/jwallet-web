// @flow

import React, { PureComponent } from 'react'

import { WalletFace, WalletLoading } from 'components'

type WalletCardHandler = () => void

type Props = {|
  +backup: ?WalletCardHandler,
  +rename: ?WalletCardHandler,
  +remove: ?WalletCardHandler,
  +simplify: ?WalletCardHandler,
  +setActive: WalletCardHandler,
  +title: string,
  +type: WalletType,
  +description: string,
  +isLoading: boolean,
  +isReadOnly: boolean,
  +isSimplified: ?boolean,
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
    simplify: null,
    isLoading: false,
    isReadOnly: false,
    isSimplified: false,
  }

  render() {
    const {
      backup,
      rename,
      remove,
      simplify,
      setActive,
      type,
      title,
      description,
      isLoading,
      isReadOnly,
      isSimplified,
    }: Props = this.props

    const iconName: string = WALLET_TYPE_ICON_MAP[type]

    if (isLoading) {
      return <WalletLoading />
    }

    return (
      <WalletFace
        backup={backup}
        rename={rename}
        remove={remove}
        simplify={simplify}
        onClick={setActive}
        title={title}
        iconName={iconName}
        description={description}
        isReadOnly={isReadOnly}
        isSimplified={isSimplified}
        hasActions
      />
    )
  }
}

export default WalletCard
