// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

import {
  JIcon,
  JText,
} from 'components/base'

import WalletFaceActions from './Actions'

type WalletFaceHandler = (SyntheticEvent<HTMLDivElement>) => void

type Props = {|
  +backup: ?WalletFaceHandler,
  +rename: ?WalletFaceHandler,
  +remove: ?WalletFaceHandler,
  +onClick: ?WalletFaceHandler,
  +simplify: ?WalletFaceHandler,
  +title: string,
  +balance: ?string,
  +iconName: string,
  +description: string,
  +isReadOnly: boolean,
  +hasActions: boolean,
  +isSimplified: ?boolean,
  +isTransparent: boolean,
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
    isReadOnly: false,
    hasActions: false,
    isSimplified: false,
    isTransparent: false,
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
      iconName,
      description,
      hasActions,
      isReadOnly,
      isSimplified,
      isTransparent,
    }: Props = this.props

    const { isToggled }: StateProps = this.state

    return (
      <div
        onClick={onClick}
        className={classNames(
          'wallet-face',
          isToggled && '-toggled',
          (isTransparent || isReadOnly) && '-transparent',
        )}
      >
        <div className='type'>
          <JIcon name={iconName} color='white' />
        </div>
        <div className='data'>
          <div className='title'>
            <JText value={title} size='large' color='white' />
          </div>
          <div className='description'>
            {isReadOnly && (
              <div className='eye'><JIcon name='eye' color='white' /></div>
            )}
            <JText value={description} color='white' />
          </div>
        </div>
        {hasActions && (
          <div className='actions'>
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
    )
  }
}

export default WalletFace
