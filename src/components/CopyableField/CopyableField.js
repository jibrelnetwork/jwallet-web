// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import JText from 'components/base/JText'
import handle from 'utils/eventHandlers/handle'
import OverlayActions from 'components/OverlayActions'

type CopyableFieldHandler = () => void

type Props = {|
  +copy: CopyableFieldHandler,
  +download: ?CopyableFieldHandler,
  +value: string,
  +valueToDisplay: ?string,
|}

class CopyableField extends PureComponent<Props> {
  static defaultProps = {
    download: null,
    valueToDisplay: null,
  }

  render() {
    const {
      copy,
      download,
      value,
      valueToDisplay,
    }: Props = this.props

    return (
      <div className='copyable-field'>
        <div className='value'>
          <JText
            value={valueToDisplay || value}
            size='large'
            color='white'
            align='center'
            whiteSpace='wrap'
          />
        </div>
        <div className='overlay'>
          <OverlayActions
            copy={handle(copy)(value)}
            load={download ? handle(download)(value) : null}
            loadLabel={t`Download as TXT`}
            copyLabel={t`Copy recovery text`}
          />
        </div>
      </div>
    )
  }
}

export default CopyableField
