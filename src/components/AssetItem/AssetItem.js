// @flow

import React, { PureComponent, Fragment } from 'react'

import classNames from 'classnames'
import { AssetBalance, ButtonWithConfirm } from 'components'
import { JAssetSymbol, JText, JCard, JIcon, JSwitch, JTooltip } from 'components/base'

type Props = {|
  deleteAssetItem: () => void,
  setIsActive: (boolean) => void,
  editAssetItemClick: () => void,
  address: Address,
  +name: string,
  +symbol: string,
  +isCustom: boolean,
  +isActive: boolean,
  +balance: BalanceString,
|}

type StateProps = {|
  isToggled: boolean,
  isHoveredEdit: boolean,
  isHoveredTrash: boolean,
|}

class AssetItem extends PureComponent<Props, StateProps> {
  static defaultProps = {
    balance: '0',
    isCustom: false,
    isActive: false,
    address: '',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isToggled: false,
      isHoveredEdit: false,
      isHoveredTrash: false,
    }
  }

  onHoverEdit = () => this.setState({ isHoveredEdit: !this.state.isHoveredEdit })

  onHoverTrash = (isHoveredTrash: boolean) => () => this.setState({ isHoveredTrash })

  toggle = () => this.setState({ isToggled: !this.state.isToggled })

  render() {
    const {
      address,
      deleteAssetItem,
      editAssetItemClick,
      setIsActive,
      name,
      symbol,
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
                <JText value={symbol} color='blue' weight='bold' size='normal' whiteSpace='wrap' />
              </div>
            )}
            <div className='data'>
              <div className='name'>
                <JText value={name} color='dark' weight='bold' size='normal' whiteSpace='wrap' />
              </div>
              <div className='balance'>
                <AssetBalance
                  color='gray'
                  size='small'
                  symbol={symbol}
                  balance={balance}
                />
              </div>
            </div>
          </div>
          <div
            className='overlay'
            onClick={this.toggle}
          />
          <div className='actions'>
            {isCustom ? (
              <Fragment>
                <div
                  className='item -edit'
                  onMouseEnter={this.onHoverEdit}
                  onMouseLeave={this.onHoverEdit}
                  onClick={editAssetItemClick}
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
                    onClick={deleteAssetItem}
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
                    onChange={setIsActive}
                    isChecked={isActive}
                    name={address}
                  />
                </div>
              </Fragment>
            ) : (
              <div className='item -switch'>
                <JSwitch
                  onChange={setIsActive}
                  isChecked={isActive}
                  name={address}
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
