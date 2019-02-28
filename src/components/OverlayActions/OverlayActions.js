// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import {
  JIcon,
  JText,
} from 'components/base'

type OverlayActionsHandler = () => void
type OverlayActionsColor = 'white' | 'gray'

type Props = {|
  +copy: OverlayActionsHandler,
  +load: ?OverlayActionsHandler,
  +copyLabel: string,
  +loadLabel: ?string,
  +color: OverlayActionsColor,
|}

const colorTextMap = {
  white: 'blue',
  gray: 'white',
}

class OverlayActions extends PureComponent<Props> {
  static defaultProps = {
    load: null,
    loadLabel: null,
    color: 'gray',
  }

  render() {
    const {
      copy,
      load,
      copyLabel,
      loadLabel,
      color,
    }: Props = this.props

    const isLoadHandlerPresent: boolean = !!(load && loadLabel)
    const textColor = colorTextMap[color]

    return (
      <div className={classNames(
        'overlay-actions',
        isLoadHandlerPresent && '-with-load',
        `-${color}`,
      )}
      >
        <div onClick={copy} className='item'>
          <div className='icon'>
            <JIcon name='list' color={textColor} size='medium' />
          </div>
          <div className='text'>
            <JText value={copyLabel} color={textColor} weight='bold' />
          </div>
        </div>
        {isLoadHandlerPresent && (
          <Fragment>
            <div className='separator'>
              <div className='line' />
            </div>
            <div onClick={load} className='item'>
              <div className='icon'>
                <JIcon name='download' color={textColor} size='medium' />
              </div>
              <div className='text'>
                <JText value={loadLabel || ''} color={textColor} weight='bold' />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default OverlayActions
