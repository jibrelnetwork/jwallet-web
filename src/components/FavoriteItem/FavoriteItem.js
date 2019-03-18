// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { Link } from 'react-router'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

import {
  JCard,
  JFlatButton,
  JIcon,
  JText,
  JTooltip,
} from 'components/base'

type Props = {|
  +remove: (FavoriteAddress) => void,
  +name: string,
  +symbol: string,
  +description: ?string,
  +address: FavoriteAddress,
  +isWalletReadOnly: boolean,
|}

type ComponentState = {|
  +isActionsToggled: boolean,
  +showDelete: boolean,
|}

class FavoriteItem extends PureComponent<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isActionsToggled: false,
      showDelete: false,
    }
  }

  handleClickToggleDelete = () => {
    this.setState({ showDelete: !this.state.showDelete })
  }

  handleOpen = () => this.setState({
    isActionsToggled: true,
  })

  handleClose = () => this.setState({
    isActionsToggled: false,
  })

  remove = () => {
    const {
      remove,
      address,
    }: Props = this.props
    remove(address)
  }

  render() {
    const {
      name,
      symbol,
      address,
      description,
      isWalletReadOnly,
    }: Props = this.props

    const {
      isActionsToggled,
    }: ComponentState = this.state

    return (
      <JCard color='white' isBorderRadius isHover>
        <div
          className={classNames('favorite-item', {
            '-active': isActionsToggled,
          })}
        >
          <div className='symbol -text'>
            <JText value={symbol} color='blue' weight='bold' size='header' whiteSpace='nowrap' />
          </div>
          <div className='data'>
            <div className='title j-text -dark -bold -clip'>
              {name}
            </div>
            <div className='address j-text -dark -nowrap'>
              {address}
            </div>
          </div>
          {description ? (
            <div className='description'>
              <div className='icon'>
                <JIcon name='message' color='gray' />
              </div>
              <div className='j-text text'>
                {description}
              </div>
            </div>
          ) :
            <div className='spacer' />
          }
          <div onClick={this.handleClose} className='overlay' />
          <div className='actions'>
            {!isWalletReadOnly && (
              <Link
                to={`/digital-assets/send?to=${address}`}
                className='item -send'
              >
                <JTooltip text={t`Send`}>
                  <JIcon name='upload' />
                </JTooltip>
              </Link>
            )}
            <Link
              to={`/favorites/address/${address}`}
              className='item -edit'
            >
              <JTooltip text={t`Edit`}>
                <JIcon name='edit' />
              </JTooltip>
            </Link>
            <div className='item -delete'>
              <div className='confirms'>
                {
                  this.state.showDelete ?
                    (
                      <div className='action -overlay-white'>
                        <JFlatButton
                          className='confirm'
                          onClick={ignoreEvent(this.remove)()}
                          color='blue'
                          label={t`Yes, delete`}
                          isBordered
                        />
                        <JFlatButton
                          onClick={this.handleClickToggleDelete}
                          label={t`No`}
                          color='blue'
                          isBordered
                        />
                      </div>
                    ) :
                    (
                      <div onClick={this.handleClickToggleDelete}>
                        <JTooltip text={t`Delete`}>
                          <JIcon name='trash' />
                        </JTooltip>
                      </div>
                    )
                }
              </div>
            </div>
            <div onClick={this.handleOpen} className='item -dots'>
              <JIcon color='gray' name='dots-full-use-fill' />
            </div>
          </div>
        </div>
      </JCard>
    )
  }
}

export default FavoriteItem
