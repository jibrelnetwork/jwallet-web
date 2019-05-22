// @flow

import React, { PureComponent } from 'react'

import {
  WalletFace,
  WalletLoading,
} from 'components'

type WalletCardHandler = () => void

type Props = {|
  +backup: ?WalletCardHandler,
  +rename: ?WalletCardHandler,
  +remove: ?WalletCardHandler,
  +simplify: ?WalletCardHandler,
  +setActive: WalletCardHandler,
  +title: string,
  +description: string,
  +isLoading: boolean,
  +isReadOnly: boolean,
  +isSimplified: ?boolean,
|}

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
      title,
      description,
      isLoading,
      isReadOnly,
      isSimplified,
    }: Props = this.props

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
        description={description}
        isReadOnly={isReadOnly}
        isSimplified={isSimplified}
        hasActions
      />
    )
  }
}

export default WalletCard
