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
  +data: TransactionWithPrimaryKeys,
  +toName: ?string,
  +fromName: ?string,
  +blockExplorerSubdomain: string,
  +assetDecimals: number,
  +isSent: boolean,
  +isActive: boolean,
|}

type StateProps = {|
  isCommenting: boolean,
|}

function getRepeatLink(data: TransactionWithPrimaryKeys, isSent: boolean): ?string {
  const {
    to,
    from,
    contractAddress,
    amount,
  }: TransactionWithPrimaryKeys = data

  if (contractAddress || !(to && from)) {
    return null
  }

  const actor: string = isSent ? `to=${to}` : `from=${from}`
  const action: 'send' | 'receive' = isSent ? 'send' : 'receive'

  return `/digital-assets/${action}?${actor}&amount=${amount}`
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
      toName,
      fromName,
      blockExplorerSubdomain,
      assetDecimals,
      isSent,
      isActive,
    } = this.props

    const {
      isCommenting,
    }: StateProps = this.state

    const {
      data,
      receiptData,
      to,
      from,
      hash,
    }: TransactionWithPrimaryKeys = this.props.data

    if (!(data && receiptData)) {
      return null
    }

    const repeatLink: ?string = getRepeatLink(this.props.data, isSent)
    const addFavoriteLink: ?string = getFavoriteLink(this.props.data, isSent)

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
              value={`${getTxFee(receiptData.gasUsed, data.gasPrice, assetDecimals)} ETH`}
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
            saveComment={this.toggle}
            deleteComment={this.toggle}
          />
        )}
      </div>
    )
  }
}

export default TransactionItemDetails
