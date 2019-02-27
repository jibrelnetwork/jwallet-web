// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  JThumbnail,
  JFlatButton,
} from 'components/base'

import handle from 'utils/eventHandlers/handle'

type Props = {|
  +goToHome: Function,
|}

type StateProps = {|
  +isHovered: boolean,
|}

class NotFoundView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isHovered: false,
    }
  }

  onHover = (isHovered: boolean) => { this.setState({ isHovered }) }

  render() {
    const {
      goToHome,
    } = this.props

    const {
      isHovered,
    }: StateProps = this.state

    return (
      <div className='not-found-view'>
        <div className='content'>
          <JThumbnail
            color='white'
            iconSize='xlarge'
            image='auth-question'
            title={t`404 – Page Not Found`}
            isTransparent
            description={[
              t`The page you're looking for can't be found.`,
              t`Check the URL and try again.`,
            ]}
          />
          <div className='actions'>
            <div
              className='back'
              onMouseEnter={handle(this.onHover)(true)}
              onMouseLeave={handle(this.onHover)(false)}
            >
              <JFlatButton
                onClick={goToHome}
                color={isHovered ? 'sky' : 'white'}
                label={t`Back to Home`}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundView
