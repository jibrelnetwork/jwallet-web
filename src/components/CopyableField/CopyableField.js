// @flow

import React, { PureComponent } from 'react'
import config from 'config'
import classNames from 'classnames'
import { t } from 'ttag'
import { noop } from 'lodash-es'

import {
  JText, JIcon,
} from 'components/base'
import OverlayActions from 'components/OverlayActions'
import {
  clipboard,
  fileSaver,
} from 'services'

type Props = {|
  +onCopySuccess: Function,
  +onDownloadSuccess: Function,
  +value: string,
  +valueToDisplay: ?string,
  +isDownloadAvailable: boolean,
|}

type StateProps = {|
  isSuccess: boolean,
|}

class CopyableField extends PureComponent<Props, StateProps> {
  static defaultProps = {
    valueToDisplay: null,
    isDownloadAvailable: false,
    onDownloadSuccess: noop,
    onCopySuccess: noop,
  }

  // eslint-disable-next-line react/sort-comp
  toggleTimeout: ?TimeoutID = null

  constructor(props: Props) {
    super(props)

    this.state = {
      isSuccess: false,
    }
  }

  componentWillUnmount() {
    if (this.toggleTimeout) {
      clearTimeout(this.toggleTimeout)
    }
  }

  onClickCopy = () => {
    clipboard.copyText(this.props.value)

    this.setState({ isSuccess: true })

    this.toggleTimeout = setTimeout(() => {
      this.setState({ isSuccess: false })
    }, config.messageCopyTimeout)

    this.props.onCopySuccess()
  }

  onClickDownload = () => {
    fileSaver.saveTXT(this.props.value, 'jwallet-backup')

    this.props.onDownloadSuccess()
  }

  render() {
    const {
      isDownloadAvailable,
      value,
      valueToDisplay,
    }: Props = this.props

    const {
      isSuccess,
    }: StateProps = this.state

    return (
      <div className={classNames('copyable-field', isSuccess && '-success')}>
        <div className='value'>
          <JText
            value={valueToDisplay || value}
            size='large'
            color='white'
            align='center'
            whiteSpace='wrap'
          />
        </div>
        <div className='success'>
          <div className='icon'>
            <JIcon name='check-circle' color='white' />
          </div>
          <div className='text'>
            <JText value={t`Copied!`} color='white' weight='bold' />
          </div>
        </div>
        <div className='overlay'>
          <OverlayActions
            copy={this.onClickCopy}
            load={isDownloadAvailable ? this.onClickDownload : null}
            loadLabel={t`Download as TXT`}
            copyLabel={t`Copy recovery text`}
          />
        </div>
      </div>
    )
  }
}

export default CopyableField
