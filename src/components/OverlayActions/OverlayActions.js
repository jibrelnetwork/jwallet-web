// @flow

import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'

import { JIcon, JText } from 'components/base'

type OverlayActionsHandler = () => void

type Props = {
  copy: OverlayActionsHandler,
  load: ?OverlayActionsHandler,
  copyLabel: string,
  loadLabel: ?string,
}

class OverlayActions extends PureComponent<Props> {
  static defaultProps = {
    load: null,
    loadLabel: null,
  }

  render() {
    const {
      copy,
      load,
      copyLabel,
      loadLabel,
    }: Props = this.props

    const isLoadHandlerPresent: boolean = !!(load && loadLabel)

    return (
      <div className={classNames('overlay-actions', isLoadHandlerPresent && '-with-load')}>
        <div onClick={copy} className='item'>
          <div className='icon'>
            <JIcon name='list' color='white' size='medium' />
          </div>
          <div className='text'>
            <JText value={copyLabel} color='white' weight='bold' />
          </div>
        </div>
        {isLoadHandlerPresent && (
          <Fragment>
            <div className='separator'>
              <div className='line' />
            </div>
            <div onClick={load} className='item'>
              <div className='icon'>
                <JIcon name='download' color='white' size='medium' />
              </div>
              <div className='text'>
                <JText value={loadLabel || ''} color='white' weight='bold' />
              </div>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

export default OverlayActions
