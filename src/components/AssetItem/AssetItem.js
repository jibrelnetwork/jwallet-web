// @flow

import classNames from 'classnames'
import checkETH from 'utils/digitalAssets/checkETH'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import {
  AssetBalance,
  ButtonWithConfirm,
} from 'components'

import {
  JCard,
  JIcon,
  JText,
  JSwitch,
  JTooltip,
  JAssetSymbol,
} from 'components/base'

type Props = {|
  +edit: (string) => void,
  +remove: (string) => void,
  +setIsActive: (string, boolean) => void,
  +name: string,
  +symbol: string,
  +address: Address,
  +balance: ?BalanceString,
  +isCustom: boolean,
  +isActive: boolean,
|}

type StateProps = {|
  +isToggled: boolean,
  +isHoveredEdit: boolean,
  +isHoveredTrash: boolean,
|}

class AssetItem extends PureComponent<Props, StateProps> {
  static defaultProps = {
    isCustom: false,
    isActive: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isToggled: false,
      isHoveredEdit: false,
      isHoveredTrash: false,
    }
  }

  onMouseEnterEdit = () => this.setState({ isHoveredEdit: true })
  onMouseLeaveEdit = () => this.setState({ isHoveredEdit: false })

  onMouseEnterRemove = () => this.setState({ isHoveredTrash: true })
  onMouseLeaveRemove = () => this.setState({ isHoveredTrash: false })

  onClickEdit = () => {
    this.props.edit(this.props.address)
  }

  onClickRemove = () => {
    this.props.remove(this.props.address)
  }

  onClickSetActive = () => {
    this.props.setIsActive(this.props.address, !this.props.isActive)
  }

  toggle = () => this.setState(prevState => ({ isToggled: !prevState.isToggled }))

  render() {
    const {
      name,
      symbol,
      address,
      balance,
      isCustom,
      isActive,
    } = this.props

    const {
      isToggled,
      isHoveredEdit,
      isHoveredTrash,
    }: StateProps = this.state

    return (
      <JCard color='white' isBorderRadius isHover>
        <div className={classNames('asset-item', isToggled && '-active')}>
          <div className='info'>
            {!isCustom ? (
              <div className='symbol -icon'>
                <JAssetSymbol symbol={symbol} color='gray' />
              </div>
            ) : (
              <div className='symbol -text'>
                <JText
                  value={symbol}
                  color='blue'
                  weight='bold'
                  size='semilarge'
                  whiteSpace='wrap'
                />
              </div>
            )}
            <div className='data'>
              <div className='name'>
                <JText value={name} color='dark' weight='bold' size='semilarge' whiteSpace='wrap' />
              </div>
              {balance && (
                <div className='balance'>
                  <AssetBalance
                    color='gray'
                    size='semismall'
                    symbol={symbol}
                    balance={balance}
                  />
                </div>
              )}
            </div>
          </div>
          <div onClick={this.toggle} className='overlay' />
          <div className='actions'>
            {isCustom ? (
              <Fragment>
                <div
                  className='item -edit'
                  onMouseEnter={this.onMouseEnterEdit}
                  onMouseLeave={this.onMouseLeaveEdit}
                  onClick={this.onClickEdit}
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
                  onMouseEnter={this.onMouseEnterRemove}
                  onMouseLeave={this.onMouseLeaveRemove}
                  onClick={this.onMouseLeaveRemove}
                >
                  <ButtonWithConfirm
                    onClick={this.onClickRemove}
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
                <div className='item -switch'>
                  <JSwitch
                    onChange={this.onClickSetActive}
                    isChecked={isActive}
                    name={address}
                  />
                </div>
              </Fragment>
            ) : (
              <div className='item -switch'>
                <JSwitch
                  onChange={this.onClickSetActive}
                  name={address}
                  isChecked={isActive}
                  isDisabled={checkETH(address) && isActive}
                />
              </div>
            )}
          </div>
        </div>
      </JCard>
    )
  }
}

export default AssetItem
