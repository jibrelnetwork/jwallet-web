// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import sliderButtonStyles from './sliderButton.m.scss'

type Props = {|
  +slideId: number,
  +isActive: boolean,
  +onClick: (slideId: number) => any,
|}

export class SliderButton extends PureComponent<Props> {
  handleClick = () => {
    this.props.onClick(this.props.slideId)
  }

  render() {
    const {
      isActive,
    } = this.props

    return (
      <button
        type='button'
        className={classNames(
          sliderButtonStyles.core,
          isActive && sliderButtonStyles['-current'],
        )}
        onClick={this.handleClick}
      />
    )
  }
}
