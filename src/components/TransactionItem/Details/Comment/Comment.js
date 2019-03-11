// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import {
  handle,
  handleTargetValue,
} from 'utils/eventHandlers'

import {
  JIcon,
  JFlatButton,
} from 'components/base'

type Props = {|
  +onToggle: () => void,
  +edit: (CommentId, string) => void,
  +comment: ?string,
  +transactionId: TransactionId,
|}

type ComponentState = {|
  +newValue: string,
|}

class TransactionItemDetailsComment extends Component<Props, ComponentState> {
  constructor(props: Props) {
    super(props)

    const { comment }: Props = props

    this.state = {
      newValue: comment || '',
    }
  }

  saveComment = (value: string) => {
    const {
      edit,
      onToggle,
      transactionId,
    }: Props = this.props

    edit(transactionId, value)
    onToggle()
  }

  deleteComment = () => this.saveComment('')

  changeValue = (newValue: string) => {
    this.setState({ newValue })
  }

  render() {
    const {
      onToggle,
      comment,
    } = this.props

    const { newValue }: ComponentState = this.state
    const isValueChanged: boolean = (comment !== newValue)

    return (
      <div className='transaction-item-details-comment'>
        <label htmlFor='message' className='icon'>
          <JIcon color='gray' name='message-add' />
        </label>
        <input
          onChange={handleTargetValue(this.changeValue)}
          value={newValue}
          type='text'
          id='message'
          className='field'
          placeholder={t`Your comment`}
        />
        <div className='actions'>
          <div className='button'>
            <JFlatButton
              onClick={handle(this.saveComment)(newValue)}
              label={t`Save`}
              color='blue'
              isBordered
            />
          </div>
          <div className='button'>
            <JFlatButton
              onClick={isValueChanged ? onToggle : this.deleteComment}
              label={isValueChanged ? t`Cancel` : t`Delete`}
              color='blue'
              isBordered
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionItemDetailsComment
