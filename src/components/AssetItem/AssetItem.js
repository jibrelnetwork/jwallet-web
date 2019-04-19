// @flow

import classNames from 'classnames'
import { t } from 'ttag'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import checkETH from 'utils/digitalAssets/checkETH'

import {
  AssetBalance,
} from 'components'

import {
  JCard,
  JIcon,
  JText,
  JSwitch,
  JTooltip,
  JAssetSymbol,
  JFlatButton,
  JLink,
} from 'components/base'

type Props = {|
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
  +isDeleteVisible: boolean,
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
      isDeleteVisible: false,
    }
  }

  handleClickToggleDelete = () => {
    this.setState({ isDeleteVisible: !this.state.isDeleteVisible })
  }

  handleClickRemove = () => {
    this.props.remove(this.props.address)
  }

  handleClickSetActive = () => {
    this.props.setIsActive(this.props.address, !this.props.isActive)
  }

  handleClick = () => this.setState(prevState => ({ isToggled: !prevState.isToggled }))

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
    }: StateProps = this.state

    return (
      <JCard color='white' isBorderRadius isHover>
        <div className={classNames('asset-item', isToggled && '-active')}>
          <div className='info'>
            <div className='symbol'>
              <JAssetSymbol symbol={symbol} color='gray' isCustom={isCustom} />
            </div>
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
          <div onClick={this.handleClick} className='overlay' />
          <div className='actions'>
            {isCustom ? (
              <Fragment>
                <JLink
                  className='item -edit'
                  href={`/assets/${address}/edit`}
                >
                  <JTooltip text={t`Edit`}>
                    <JIcon
                      name='edit'
                    />
                  </JTooltip>
                </JLink>
                <div className='item -delete'>
                  <div className='confirms'>
                    {
                      this.state.isDeleteVisible ?
                        (
                          <div className='action -overlay-white'>
                            <JFlatButton
                              className='confirm'
                              onClick={this.handleClickRemove}
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
                <div
                  className='item -dots'
                  onClick={this.handleClick}
                >
                  <JIcon
                    color='gray'
                    name='dots-full-use-fill'
                  />
                </div>
                <div className='item -switch'>
                  <JSwitch
                    onChange={this.handleClickSetActive}
                    isChecked={isActive}
                    name={address}
                  />
                </div>
              </Fragment>
            ) : (
              <div className='item -switch'>
                <JSwitch
                  onChange={this.handleClickSetActive}
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
