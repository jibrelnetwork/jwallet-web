// @flow

import React, { PureComponent } from 'react'

import { JThumbnail, JFlatButton } from 'components/base'

type Props = {|
  goToHome: () => void,
|}

type StateProps = {|
  isHovered: boolean,
|}

class NotFoundView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isHovered: false,
    }
  }

  onHover = () => this.setState({ isHovered: !this.state.isHovered })

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
            title='404. Page Not Found.'
            isTransparent
            description={[
              'The page you\'re looking for can\'t be found.',
              'Check the URL and try again.',
            ]}
          />
          <div className='actions'>
            <div className='back' onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
              <JFlatButton
                onClick={goToHome}
                color={isHovered ? 'sky' : 'white'}
                label='Back to Home'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundView
