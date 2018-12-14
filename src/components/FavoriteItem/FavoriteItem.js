// @flow

import React, { PureComponent } from 'react'

import classNames from 'classnames'
import { ButtonWithConfirm } from 'components'
import { JText, JCard, JIcon, JTooltip } from 'components/base'

type Props = {|
  +onClickEdit: () => void,
  +onClickSend: () => void,
  +onClickRemove: () => void,
  +address: Address,
  +title: string,
  +symbol: string,
  description: string,
|}

type StateProps = {|
  hasOpenedActions: boolean,
  isHoveredSend: boolean,
  isHoveredEdit: boolean,
  isHoveredTrash: boolean,
|}

class FavoriteItem extends PureComponent<Props, StateProps> {
  static defaultProps = {
    isCustom: false,
    isActive: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      hasOpenedActions: false,
      isHoveredSend: false,
      isHoveredEdit: false,
      isHoveredTrash: false,
    }
  }

  onHoverSend = (isHoveredSend: boolean) => () => this.setState({ isHoveredSend })

  onHoverEdit = (isHoveredEdit: boolean) => () => this.setState({ isHoveredEdit })

  onHoverTrash = (isHoveredTrash: boolean) => () => this.setState({ isHoveredTrash })

  openActions = () => this.setState({
    hasOpenedActions: true,
  })

  closeActions = () => this.setState({
    hasOpenedActions: false,
  })

  render() {
    const {
      address,
      onClickEdit,
      onClickSend,
      onClickRemove,
      title,
      description,
      symbol,
    } = this.props

    const {
      hasOpenedActions,
      isHoveredSend,
      isHoveredEdit,
      isHoveredTrash,
    }: StateProps = this.state

    return (
      <JCard color='white' isBorderRadius isHover>
        <div
          className={classNames('favorite-item', {
            '-active': hasOpenedActions,
          })}
          onClick={this.closeActions}
        >
          <div className='symbol -text'>
            <JText value={symbol} color='blue' weight='bold' size='header' whiteSpace='nowrap' />
          </div>
          <div className='data'>
            <div className='title'>
              <JText value={title} color='dark' weight='bold' size='normal' whiteSpace='clip' />
            </div>
            <div className='address'>
              <JText value={address} color='dark' weight='bold' size='small' whiteSpace='nowrap' />
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
          <div className='actions'>
            <div
              className='item -send'
              onMouseEnter={this.onHoverSend(true)}
              onMouseLeave={this.onHoverSend(false)}
              onClick={onClickSend}
            >
              <JTooltip text='Send'>
                <JIcon
                  size='medium'
                  color={isHoveredSend ? 'sky' : 'blue'}
                  name='upload'
                />
              </JTooltip>
            </div>
            <div
              className='item -edit'
              onMouseEnter={this.onHoverEdit(true)}
              onMouseLeave={this.onHoverEdit(false)}
              onClick={onClickEdit}
            >
              <JTooltip text='Edit'>
                <JIcon
                  size='medium'
                  color={isHoveredEdit ? 'sky' : 'blue'}
                  name='edit'
                />
              </JTooltip>
            </div>
            <div
              className='item -delete'
              onMouseEnter={this.onHoverTrash(true)}
              onMouseLeave={this.onHoverTrash(false)}
              onClick={this.onHoverTrash(false)}
            >
              <ButtonWithConfirm
                onClick={onClickRemove}
                color='blue'
                bgColor='white'
                labelCancel='No'
                iconTooltipName='trash'
                labelConfirm='Yes, delete'
                iconTooltipColor={isHoveredTrash ? 'sky' : 'blue'}
                isReverse
              />
            </div>
            <div
              className='item -dots'
              onClick={this.openActions}
            >
              <JIcon
                size='medium'
                color='gray'
                name='dots-full'
              />
            </div>
          </div>
        </div>
      </JCard>
    )
  }
}

export default FavoriteItem
