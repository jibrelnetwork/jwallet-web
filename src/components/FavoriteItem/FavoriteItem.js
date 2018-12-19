// @flow

import classNames from 'classnames'
import { Link } from 'react-router'
import React, { PureComponent } from 'react'

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
|}

type ComponentState = {|
  +isHoveredSend: boolean,
  +isHoveredEdit: boolean,
  +isHoveredTrash: boolean,
  +isActionsToggled: boolean,
|}

class FavoriteItem extends PureComponent<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isHoveredSend: false,
      isHoveredEdit: false,
      isHoveredTrash: false,
      isActionsToggled: false,
    }
  }

  onHoverSend = (isHoveredSend: boolean) => () => this.setState({ isHoveredSend })

  onHoverEdit = (isHoveredEdit: boolean) => () => this.setState({ isHoveredEdit })

  onHoverTrash = (isHoveredTrash: boolean) => () => this.setState({ isHoveredTrash })

  openActions = () => this.setState({
    isActionsToggled: true,
  })

  closeActions = () => this.setState({
    isActionsToggled: false,
  })

  remove = () => {
    const {
      remove,
      address,
    }: Props = this.props

    this.onHoverTrash(false)

    remove(address)
  }

  render() {
    const {
      name,
      symbol,
      address,
      description,
    }: Props = this.props

    const {
      isHoveredSend,
      isHoveredEdit,
      isHoveredTrash,
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
          {description ?
            <div className='description'>
              <div className='icon'>
                <JIcon size='medium' name='message' color='gray' />
              </div>
              <div className='j-text text'>
                {description}
              </div>
            </div> :
            <div className='spacer' />
          }
          <div onClick={this.closeActions} className='overlay' />
          <div className='actions'>
            <Link
              onMouseEnter={this.onHoverSend(true)}
              onMouseLeave={this.onHoverSend(false)}
              to={`/digital-assets/send?to=${address}`}
              className='item -send'
            >
              <JTooltip text='Send'>
                <JIcon
                  color={isHoveredSend ? 'sky' : 'blue'}
                  size='medium'
                  name='upload'
                />
              </JTooltip>
            </Link>
            <Link
              onMouseEnter={this.onHoverEdit(true)}
              onMouseLeave={this.onHoverEdit(false)}
              to={`/favorites/address/${address}`}
              className='item -edit'
            >
              <JTooltip text='Edit'>
                <JIcon
                  color={isHoveredEdit ? 'sky' : 'blue'}
                  name='edit'
                  size='medium'
                />
              </JTooltip>
            </Link>
            <div
              onClick={this.onHoverTrash(false)}
              onMouseEnter={this.onHoverTrash(true)}
              onMouseLeave={this.onHoverTrash(false)}
              className='item -delete'
            >
              <ButtonWithConfirm
                onClick={ignoreEvent(this.remove)()}
                iconTooltipColor={isHoveredTrash ? 'sky' : 'blue'}
                color='blue'
                bgColor='white'
                labelCancel='No'
                iconTooltipName='trash'
                labelConfirm='Yes, delete'
                isReverse
              />
            </div>
            <div onClick={this.openActions} className='item -dots'>
              <JIcon size='medium' color='gray' name='dots-full' />
            </div>
          </div>
        </div>
      </JCard>
    )
  }
}

export default FavoriteItem
