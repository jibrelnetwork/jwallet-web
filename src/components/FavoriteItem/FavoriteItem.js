// @flow

import React, { PureComponent } from 'react'

import classNames from 'classnames'
import { ButtonWithConfirm } from 'components'
import { JText, JCard, JIcon, JTooltip } from 'components/base'
import { Link } from 'react-router'

type Props = {|
  +onClickRemove: (string) => void,
  +address: Address,
  +title: string,
  +symbol: string,
  description: ?string,
|}

type StateProps = {|
  hasOpenedActions: boolean,
  isHoveredSend: boolean,
  isHoveredEdit: boolean,
  isHoveredTrash: boolean,
|}

class FavoriteItem extends PureComponent<Props, StateProps> {
  static defaultProps = {
    onClickRemove: () => null,
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

  openActions = () => {
    this.setState({
      hasOpenedActions: true,
    })
  }

  closeActions = () => this.setState({
    hasOpenedActions: false,
  })

  handleClickRemove = () => {
    this.props.onClickRemove(this.props.address)
  }

  render() {
    const {
      address,
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
        >
          <div className='symbol -text'>
            <JText value={symbol} color='blue' weight='bold' size='header' whiteSpace='nowrap' />
          </div>
          <div className='data'>
            <div className='title j-text -dark -bold -clip'>
              {title}
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
          <div
            className='overlay'
            onClick={this.closeActions}
          />
          <div className='actions'>
            <Link
              to={`/digital-assets/send?to=${address}`}
              className='item -send'
              onMouseEnter={this.onHoverSend(true)}
              onMouseLeave={this.onHoverSend(false)}
            >
              <JTooltip text='Send'>
                <JIcon
                  size='medium'
                  color={isHoveredSend ? 'sky' : 'blue'}
                  name='upload'
                />
              </JTooltip>
            </Link>
            <Link
              to={`/favorites/edit?address=${address}`}
              className='item -edit'
              onMouseEnter={this.onHoverEdit(true)}
              onMouseLeave={this.onHoverEdit(false)}
            >
              <JTooltip text='Edit'>
                <JIcon
                  size='medium'
                  color={isHoveredEdit ? 'sky' : 'blue'}
                  name='edit'
                />
              </JTooltip>
            </Link>
            <div
              className='item -delete'
              onMouseEnter={this.onHoverTrash(true)}
              onMouseLeave={this.onHoverTrash(false)}
              onClick={this.onHoverTrash(false)}
            >
              <ButtonWithConfirm
                onClick={this.handleClickRemove}
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
