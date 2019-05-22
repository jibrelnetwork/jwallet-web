// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

import WalletFaceActions from './Actions'

import walletFace from './walletFace.m.scss'
import leftPartWalletCard from './left-part-wallet-card.svg'

type WalletFaceHandler = (SyntheticEvent<HTMLDivElement>) => void

type Props = {|
  +backup: ?WalletFaceHandler,
  +rename: ?WalletFaceHandler,
  +remove: ?WalletFaceHandler,
  +onClick: ?WalletFaceHandler,
  +simplify: ?WalletFaceHandler,
  +title: string,
  +balance: ?string,
  +description: string,
  // +isReadOnly: boolean,
  +hasActions: boolean,
  +isSimplified: ?boolean,
  +isSelected: boolean,
|}

type StateProps = {|
  isToggled: boolean,
|}

class WalletFace extends PureComponent<Props, StateProps> {
  static defaultProps = {
    backup: null,
    rename: null,
    remove: null,
    balance: null,
    simplify: null,
    // isReadOnly: false,
    hasActions: false,
    isSimplified: false,
    isSelected: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isToggled: false,
    }
  }

  toggle = () => {
    this.setState({ isToggled: !this.state.isToggled })
  }

  simplify = (event: SyntheticEvent<HTMLDivElement>) => {
    this.toggle()

    const { simplify }: Props = this.props

    if (simplify) {
      simplify(event)
    }
  }

  render() {
    const {
      backup,
      rename,
      remove,
      onClick,
      simplify,
      title,
      balance,
      description,
      hasActions,
      // isReadOnly,
      isSimplified,
      isSelected,
    }: Props = this.props

    const { isToggled }: StateProps = this.state

    return (
      <div
        onClick={onClick}
        className={classNames(
          walletFace.core,
          isToggled && walletFace['-toggled'],
          isSelected && walletFace['-selected'],
        )}
      >
        <img src={leftPartWalletCard} className={walletFace['left-part']} alt='' />
        <div className={walletFace.body}>
          <div className={walletFace.data}>
            <h2 className={walletFace.title}>{title}</h2>
            <p className={walletFace.description}>{description}</p>
            <p className={walletFace.sum}>$9,999,999.99</p>
          </div>
          {hasActions && (
            <div className={walletFace.actions}>
              <WalletFaceActions
                backup={backup}
                rename={rename}
                remove={remove}
                toggle={ignoreEvent(this.toggle)()}
                simplify={simplify && this.simplify}
                balance={balance}
                isToggled={isToggled}
                isSimplified={isSimplified}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default WalletFace
