// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import {
  JText,
  JFlatButton,
} from 'components/base'

import {
  getTxFee,
  getTxLink,
  getAddressLink,
} from 'utils/transactions'

import TransactionItemDetailsComment from './Comment'

type Props = {|
  +editComment: (CommentId, string) => void,
  +asset: DigitalAsset,
  +data: TransactionWithPrimaryKeys,
  +toName: ?string,
  +comment: ?string,
  +fromName: ?string,
  +blockExplorerSubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
|}

type StateProps = {|
  +isCommenting: boolean,
|}

function getRepeatLink(
  data: TransactionWithPrimaryKeys,
  assetAddress: AssetAddress,
  isSent: boolean,
): ?string {
  const {
    to,
    from,
    contractAddress,
    amount,
  }: TransactionWithPrimaryKeys = data

  if (!isSent || contractAddress || !(to && from)) {
    return null
  }

  return `/digital-assets/send?to=${to}&asset=${assetAddress}&amount=${amount}`
}

function getFavoriteLink(data: TransactionWithPrimaryKeys, isSent: boolean): ?string {
  const {
    to,
    from,
    contractAddress,
  }: TransactionWithPrimaryKeys = data

  if (contractAddress || !(to && from)) {
    return null
  }

  return `/favorites/address/${isSent ? to : from}`
}

class TransactionItemDetails extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isCommenting: false,
    }
  }

  toggle = () => this.setState({ isCommenting: !this.state.isCommenting })

  render() {
    const {
      editComment,
      data,
      asset,
      comment,
      toName,
      fromName,
      blockExplorerSubdomain,
      isSent,
      isActive,
    } = this.props

    const { isCommenting }: StateProps = this.state

    const {
      keys,
      receiptData,
      to,
      from,
      hash,
      data: txData,
    }: TransactionWithPrimaryKeys = data

    const {
      address,
      decimals,
    }: DigitalAsset = asset

    if (!(txData && receiptData)) {
      return null
    }

    const addFavoriteLink: ?string = getFavoriteLink(data, isSent)
    const repeatLink: ?string = getRepeatLink(data, address, isSent)

    return (
      <div className={classNames('transaction-item-details', isActive && '-active')}>
        <div className='item'>
          <div className='label'>
            <JText value='TX Hash' color='gray' />
          </div>
          <div className='value'>
            <a
              href={getTxLink(hash, blockExplorerSubdomain)}
              target='_blank'
              className='link'
              rel='noopener noreferrer'
            >
              <JText value={hash} color='blue' weight='bold' />
            </a>
          </div>
        </div>
        {from && (
          <div className='item -small-width'>
            <div className='label'>
              <JText value='From address' color='gray' />
            </div>
            <div className='value'>
              <a
                href={getAddressLink(from, blockExplorerSubdomain)}
                target='_blank'
                className='link'
                rel='noopener noreferrer'
              >
                <JText
                  value={fromName ? `${fromName} — ${from}` : from}
                  color='blue'
                  weight='bold'
                />
              </a>
            </div>
          </div>
        )}
        {to && (
          <div className='item -small-width'>
            <div className='label'>
              <JText value='To address' color='gray' />
            </div>
            <div className='value'>
              <a
                href={getAddressLink(to, blockExplorerSubdomain)}
                target='_blank'
                className='link'
                rel='noopener noreferrer'
              >
                <JText
                  value={toName ? `${toName} — ${to}` : to}
                  color='blue'
                  weight='bold'
                />
              </a>
            </div>
          </div>
        )}
        <div className='item'>
          <div className='label'>
            <JText value='Fee' color='gray' />
          </div>
          <div className='value'>
            <JText
              value={`${getTxFee(receiptData.gasUsed, txData.gasPrice, decimals)} ETH`}
              color='gray'
              weight='bold'
            />
          </div>
        </div>
        <div className='actions'>
          {!!repeatLink && (
            <div className='action'>
              <JFlatButton
                to={repeatLink}
                color='gray'
                iconColor='gray'
                iconName='repeat'
                iconSize='medium'
                label='Repeat payment'
              />
            </div>
          )}
          {!!addFavoriteLink && (
            <div className='action'>
              <JFlatButton
                to={addFavoriteLink}
                color='gray'
                iconColor='gray'
                iconSize='medium'
                iconName='star-add'
                label='Add to favourites'
              />
            </div>
          )}
          <div className='action'>
            <JFlatButton
              onClick={this.toggle}
              color='gray'
              iconColor='gray'
              iconSize='medium'
              label='Add comment'
              iconName='message-add'
            />
          </div>
        </div>
        {isCommenting && (
          <TransactionItemDetailsComment
            edit={editComment}
            toggle={this.toggle}
            comment={comment}
            transactionId={keys.id}
          />
        )}
      </div>
    )
  }
}

export default TransactionItemDetails
