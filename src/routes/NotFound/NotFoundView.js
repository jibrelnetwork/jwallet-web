// @flow

import React from 'react'

import { JThumbnail, JFlatButton } from 'components/base'

type Props = {|
  goToHome: () => void,
|}

const NotFoundView = ({ goToHome }: Props) => (
  <div className='not-found-view'>
    <div className='content'>
      <JThumbnail
        color='white'
        iconSize='xlarge'
        image='auth-question'
        title='404. Page Not Found.'
        description={[
          'The page you\'re looking for can\'t be found.',
          'Check the URL and try again.',
        ]}
      />
      <div className='actions'>
        <div className='back'>
          <JFlatButton
            onClick={goToHome}
            color='white'
            label='Back to Home'
            isHoverOpacity
          />
        </div>
      </div>
    </div>
  </div>
)

export default NotFoundView
