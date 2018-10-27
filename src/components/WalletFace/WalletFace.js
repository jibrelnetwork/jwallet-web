// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JCard, JIcon, JText } from 'components/base'

import WalletFaceActions from './Actions'

type WalletFaceHandler = () => void

type Props = {|
  +onClick: Function,
  +renameWallet: ?WalletFaceHandler,
  +backupWallet: ?WalletFaceHandler,
  +deleteWallet: ?WalletFaceHandler,
  +title: string,
  +iconName: string,
  +description: string,
  +isReadOnly: boolean,
  +hasActions: boolean,
  +isTransparent: boolean,
|}

type StateProps = {|
  isToggled: boolean,
|}

class WalletFace extends PureComponent<Props, StateProps> {
  static defaultProps = {
    renameWallet: null,
    backupWallet: null,
    deleteWallet: null,
    isReadOnly: false,
    hasActions: false,
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

  render() {
    const {
      onClick,
      renameWallet,
      backupWallet,
      deleteWallet,
      title,
      iconName,
      description,
      hasActions,
      isReadOnly,
      isTransparent,
    }: Props = this.props

    const {
      isToggled,
    }: StateProps = this.state

    return (
      <JCard color='blue'>
        <div
          onClick={onClick}
          className={classNames(
            'wallet-face',
            isToggled && '-toggled',
            (isTransparent || isReadOnly) && '-transparent',
          )}
        >
          <div className='type'>
            <JIcon name={iconName} size='medium' color='white' />
          </div>
          <div className='data'>
            <div className='title'>
              <JText value={title} size='large' color='white' />
            </div>
            <div className='description'>
              {isReadOnly && (
                <div className='eye'><JIcon name='eye' size='medium' color='white' /></div>
              )}
              <JText value={description} color='white' />
            </div>
          </div>
          {hasActions && (
            <WalletFaceActions
              toggle={ignoreEvent(this.toggle)()}
              renameWallet={renameWallet}
              backupWallet={backupWallet}
              deleteWallet={deleteWallet}
              isToggled={isToggled}
            />
          )}
        </div>
      </JCard>
    )
  }
}

export default WalletFace
