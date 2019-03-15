// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'

import handle from 'utils/eventHandlers/handle'
import divDecimals from 'utils/numbers/divDecimals'

import {
  JText,
  JFlatButton,
} from 'components/base'

import {
  getTxFee,
  getTxLink,
  getAddressLink,
} from 'utils/transactions'
import assetsData from 'data/assets'

import TransactionItemDetailsComment from './Comment'

type Props = {|
  +removeFavorite: (Address) => void,
  +editComment: (CommentId, string) => void,
  +asset: DigitalAsset,
  +data: TransactionWithPrimaryKeys,
  +toName: ?string,
  +comment: ?string,
  +fromName: ?string,
  +txAddress: ?Address,
  +blockExplorerUISubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
  +isFromFavorites: boolean,
  +isMintable: boolean,
|}

type TransactionItemDetailsHovered = 'hash' | 'from' | 'to'

type StateProps = {|
  +hovered: ?TransactionItemDetailsHovered,
  +isCommenting: boolean,
|}

function getRepeatLink(
  txData: TransactionWithPrimaryKeys,
  digitalAsset: DigitalAsset,
  comment: ?string,
  isSent: boolean,
): ?string {
  const {
    data,
    receiptData,
    to,
    from,
    amount,
    contractAddress,
  }: TransactionWithPrimaryKeys = txData

  const {
    address,
    decimals,
  }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

  if (!isSent || contractAddress || !(to && from)) {
    return null
  }

  const path: string = '/digital-assets/send'
  const toParam: string = `to=${to}`
  const assetParam: string = `&asset=${address}`
  const commentParam: string = comment ? `&comment=${comment}` : ''
  const gasPriceParam: string = data ? `&gas=${data.gasPrice}` : ''
  const amountParam: string = `&amount=${divDecimals(amount, decimals)}`
  const gasParam: string = receiptData ? `&gasPrice=${receiptData.gasUsed}` : ''

  return `${path}?${toParam}${assetParam}${amountParam}${gasParam}${gasPriceParam}${commentParam}`
}

function getFavoriteLink(
  txAddress: ?Address,
  isExist: boolean,
  isContractCreation: boolean,
): ?string {
  if (!txAddress || isExist || isContractCreation) {
    return null
  }

  return `/favorites/address/${txAddress}`
}

class TransactionItemDetails extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isCommenting: false,
      hovered: null,
    }
  }

  onHover = (hovered: ?TransactionItemDetailsHovered) => () => this.setState({ hovered })

  handleClick = () => this.setState({ isCommenting: !this.state.isCommenting })

  render() {
    const {
      editComment,
      removeFavorite,
      asset,
      toName,
      comment,
      fromName,
      txAddress,
      blockExplorerUISubdomain,
      isSent,
      isActive,
      isFromFavorites,
      isMintable,
      data: txData,
    } = this.props

    const {
      isCommenting,
      hovered,
    }: StateProps = this.state

    const {
      data,
      keys,
      receiptData,
      to,
      from,
      hash,
      contractAddress,
    }: TransactionWithPrimaryKeys = txData

    if (!(data && receiptData)) {
      return null
    }

    const repeatLink: ?string = getRepeatLink(txData, asset, comment, isSent)
    const addFavoriteLink: ?string = getFavoriteLink(txAddress, isFromFavorites, !!contractAddress)

    const favoritesLabel = isFromFavorites
      ? t`Remove from Favorites`
      : t`Add to Favorites`

    const commentLabel = comment
      ? t`Edit comment`
      : t`Add comment`

    return (
      <div className={classNames('transaction-item-details', isActive && '-active')}>
        <div className='item'>
          <div className='label'>
            <JText value={t`TX Hash`} color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(hash, blockExplorerUISubdomain)}
              onMouseEnter={this.onHover('hash')}
              onMouseLeave={this.onHover(null)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              <JText value={hash} color={hovered === 'hash' ? 'sky' : 'blue'} weight='bold' />
            </a>
          </div>
        </div>
        {from && (
          <div className='item -small-width'>
            <div className='label'>
              <JText value={t`From address`} color='gray' />
            </div>
            <div className='value'>
              <a
                href={getAddressLink(from, blockExplorerUISubdomain)}
                onMouseEnter={this.onHover('from')}
                onMouseLeave={this.onHover(null)}
                target='_blank'
                className='link'
                rel='noopener noreferrer'
              >
                <JText
                  value={fromName ? `${fromName} — ${from}` : from}
                  color={hovered === 'from' ? 'sky' : 'blue'}
                  weight='bold'
                />
              </a>
            </div>
          </div>
        )}
        {to && (
          <div className='item -small-width'>
            <div className='label'>
              <JText value={t`To address`} color='gray' />
            </div>
            <div className='value'>
              <a
                href={getAddressLink(to, blockExplorerUISubdomain)}
                onMouseEnter={this.onHover('to')}
                onMouseLeave={this.onHover(null)}
                target='_blank'
                className='link'
                rel='noopener noreferrer'
              >
                <JText
                  value={toName ? `${toName} — ${to}` : to}
                  color={hovered === 'to' ? 'sky' : 'blue'}
                  weight='bold'
                />
              </a>
            </div>
          </div>
        )}
        <div className='item'>
          <div className='label'>
            <JText value={t`Fee`} color='gray' />
          </div>
          <div className='value'>
            <JText
              value={`${getTxFee(
                receiptData.gasUsed,
                data.gasPrice,
                assetsData.ethereum.blockchainParams.decimals,
              )} ETH`}
              color='gray'
              weight='bold'
            />
          </div>
        </div>
        <div className='actions'>
          {!!repeatLink && !isMintable && (
            <div className='action'>
              <JFlatButton
                to={repeatLink}
                color='gray'
                iconColor='gray'
                iconName='repeat'
                label={t`Repeat payment`}
              />
            </div>
          )}
          {(addFavoriteLink || isFromFavorites) && !isMintable && (
            <div className='action'>
              <JFlatButton
                onClick={isFromFavorites ? handle(removeFavorite)(txAddress) : null}
                to={addFavoriteLink}
                iconName={`star-${isFromFavorites ? 'remove' : 'add'}`}
                label={favoritesLabel}
                color='gray'
                iconColor='gray'
              />
            </div>
          )}
          <div className='action'>
            <JFlatButton
              onClick={this.handleClick}
              label={commentLabel}
              iconName={`message-${comment ? 'edit' : 'add'}`}
              color='gray'
              iconColor='gray'
            />
          </div>
        </div>
        {isCommenting && (
          <TransactionItemDetailsComment
            edit={editComment}
            onToggle={this.handleClick}
            comment={comment}
            transactionId={keys.id}
          />
        )}
      </div>
    )
  }
}

export default TransactionItemDetails
