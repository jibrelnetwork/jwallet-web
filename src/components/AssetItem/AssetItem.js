// @flow

import React, { PureComponent, Fragment } from 'react'

import classNames from 'classnames'
import { AssetBalance } from 'components'
import { JAssetSymbol, JText, JCard, JIcon, JFlatButton, JSwitch, JTooltip } from 'components/base'

type Props = {
  deleteAssetItem: () => void,
  +name: string,
  +symbol: string,
  +balance: number,
  +isCustom: boolean,
}

type StateProps = {|
  isChange: boolean,
  isHoveredEdit: boolean,
  isHoveredTrash: boolean,
  isDeleteDialog: boolean,
|}

class AssetItem extends PureComponent<Props, StateProps> {
  static defaultProps = {
    fiatBalance: 0,
    balance: 0,
    isCustom: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      isChange: false,
      isHoveredEdit: false,
      isHoveredTrash: false,
      isDeleteDialog: false,
    }
  }

  onHoverEdit = () => this.setState({ isHoveredEdit: !this.state.isHoveredEdit })

  onHoverTrash = () => this.setState({ isHoveredTrash: !this.state.isHoveredTrash })

  toggleChange = () => this.setState({ isChange: !this.state.isChange })

  toggleDeleteDialog = () => this.setState({ isDeleteDialog: !this.state.isDeleteDialog })

  render() {
    const {
      deleteAssetItem,
      name,
      symbol,
      balance,
      isCustom,
    } = this.props

    const {
      isChange,
      isHoveredEdit,
      isHoveredTrash,
      isDeleteDialog,
    }: StateProps = this.state

    return (
      <JCard color='white' isBorderRadius isHover>
        <div className='asset-item'>
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
          <div className='actions'>
            {isCustom && (
              <Fragment>
                {!isDeleteDialog ? (
                  <Fragment>
                    <div
                      className={classNames('overlay', !isChange && '-hide')}
                      onClick={this.toggleChange}
                    />
                    <div
                      className={classNames('item', !isChange && '-hide')}
                      onMouseEnter={this.onHoverEdit}
                      onMouseLeave={this.onHoverEdit}
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
                      className={classNames('item', !isChange && '-hide')}
                      onMouseEnter={this.onHoverTrash}
                      onMouseLeave={this.onHoverTrash}
                      onClick={this.toggleDeleteDialog}
                    >
                      <JTooltip text='Delete'>
                        <JIcon
                          size='medium'
                          color={isHoveredTrash ? 'sky' : 'blue'}
                          name='trash'
                        />
                      </JTooltip>
                    </div>
                    <div
                      className={classNames('item -dots', isChange && '-hide')}
                      onClick={this.toggleChange}
                    >
                      <JIcon
                        size='medium'
                        color='gray'
                        name='dots-full'
                      />
                    </div>
                    <div className='item'>
                      <JSwitch
                        onChange={console.log()}
                        name='NULL'
                      />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className='button'>
                      <JFlatButton
                        onClick={deleteAssetItem}
                        label='Yes, delete'
                        color='blue'
                        isBordered
                      />
                    </div>
                    <div className='button'>
                      <JFlatButton
                        onClick={this.toggleDeleteDialog}
                        label='No'
                        color='blue'
                        isBordered
                      />
                    </div>

                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </JCard>
    )
  }
}

export default AssetItem
