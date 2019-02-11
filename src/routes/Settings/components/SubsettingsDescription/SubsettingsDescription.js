// @flow

import React, { PureComponent } from 'react'
import { JText } from 'components/base'

import './subsettingsDescription.scss'

type Props = {
  text: string,
}

export default class SubsettingsDescription extends PureComponent<Props, *> {
  render() {
    return (
      <div className='subsettings-description'>
        <JText value={this.props.text} size='large' color='gray' align='center' whiteSpace='wrap' />
        <div className='border' />
      </div>
    )
  }
}
