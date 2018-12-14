// @flow

import React, { PureComponent } from 'react'

import classNames from 'classnames'
import { ButtonWithConfirm } from 'components'
import { JText, JCard, JIcon, JTooltip } from 'components/base'

type Props = {
  +edit: () => void,
  +send: () => void,
  +remove: () => void,
  +address: Address,
  +name: string,
  +symbol: string,
}

type StateProps = {|
  isToggled: boolean,
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
      isToggled: false,
      isHoveredSend: false,
      isHoveredEdit: false,
      isHoveredTrash: false,
    }
  }

  onHoverSend = (isHoveredSend: boolean) => () => this.setState({ isHoveredSend })

  onHoverEdit = (isHoveredEdit: boolean) => () => this.setState({ isHoveredEdit })

  onHoverTrash = (isHoveredTrash: boolean) => () => this.setState({ isHoveredTrash })

  toggle = () => this.setState({ isToggled: !this.state.isToggled })

  render() {
    const {
      address,
      edit,
      send,
      remove,
      name,
      symbol,
    } = this.props

    const {
      isToggled,
      isHoveredSend,
      isHoveredEdit,
      isHoveredTrash,
    }: StateProps = this.state

    return (
      <JCard color='white' isBorderRadius isHover>
        <div className={classNames('favorite-item', isToggled && '-active')}>
          <div className='info'>
            <div className='symbol -text'>
              <JText value={symbol} color='blue' weight='bold' size='header' whiteSpace='wrap' />
            </div>
            <div className='data'>
              <div className='name'>
                <JText value={name} color='dark' weight='bold' size='normal' whiteSpace='wrap' />
              </div>
              <div className='balance'>
                <JText value={address} color='dark' weight='bold' size='small' whiteSpace='wrap' />
              </div>
            </div>
          </div>
          <div
            className='overlay'
            onClick={this.toggle}
          />
          <div className='actions'>
            <div
              className='item -send'
              onMouseEnter={this.onHoverSend(true)}
              onMouseLeave={this.onHoverSend(false)}
              onClick={send}
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
              onClick={edit}
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
                onClick={remove}
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
              onClick={this.toggle}
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