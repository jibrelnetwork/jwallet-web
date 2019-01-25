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
  +edit: () => void,
  +remove: () => void,
  +setIsActive: (boolean) => void,
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

  onHoverEdit = () => this.setState({ isHoveredEdit: !this.state.isHoveredEdit })

  onHoverTrash = (isHoveredTrash: boolean) => () => this.setState({ isHoveredTrash })

  toggle = () => this.setState({ isToggled: !this.state.isToggled })

  render() {
    const {
      edit,
      remove,
      setIsActive,
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
                  onMouseEnter={this.onHoverEdit}
                  onMouseLeave={this.onHoverEdit}
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
                  name={address}
                  isChecked={isActive}
                  isDisabled={!__DEV__ && checkETH(address) && isActive}
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
