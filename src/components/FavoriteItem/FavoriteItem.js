// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { Link } from 'react-router'

import ButtonWithConfirm from 'components/ButtonWithConfirm'
import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

import {
  JCard,
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

type FavoriteItemHoveredIcon = 'send' | 'edit' | 'trash'

type ComponentState = {|
  +hovered: ?FavoriteItemHoveredIcon,
  +isActionsToggled: boolean,
|}

class FavoriteItem extends PureComponent<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hovered: null,
      isActionsToggled: false,
    }
  }

  onHover = (hovered: ?FavoriteItemHoveredIcon) => () => this.setState({ hovered })

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

    this.onHover(null)

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
      hovered,
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
                onMouseEnter={this.onHover('send')}
                onMouseLeave={this.onHover(null)}
                to={`/digital-assets/send?to=${address}`}
                className='item -send'
              >
                <JTooltip text={t`Send`}>
                  <JIcon
                    color={(hovered === 'send') ? 'sky' : 'blue'}
                    name='upload'
                  />
                </JTooltip>
              </Link>
            )}
            <Link
              onMouseEnter={this.onHover('edit')}
              onMouseLeave={this.onHover(null)}
              to={`/favorites/address/${address}`}
              className='item -edit'
            >
              <JTooltip text={t`Edit`}>
                <JIcon
                  color={(hovered === 'edit') ? 'sky' : 'blue'}
                  name='edit'
                />
              </JTooltip>
            </Link>
            <div
              onClick={this.onHover(null)}
              onMouseLeave={this.onHover(null)}
              onMouseEnter={this.onHover('trash')}
              className='item -delete'
            >
              <ButtonWithConfirm
                onClick={ignoreEvent(this.remove)()}
                iconTooltipColor={(hovered === 'trash') ? 'sky' : 'blue'}
                color='blue'
                bgColor='white'
                labelCancel={t`No`}
                iconTooltipName='trash'
                labelConfirm={t`Yes, delete`}
                isReverse
              />
            </div>
            <div onClick={this.handleOpen} className='item -dots'>
              <JIcon color='gray' name='dots-full' />
            </div>
          </div>
        </div>
      </JCard>
    )
  }
}

export default FavoriteItem
