// @flow

import React from 'react'

import { JThumbnail, JFlatButton } from 'components/base'

const NOT_FOUND_DESCRIPTION = [
  'The page you\'re looking for can\'t be found.',
  'Check the URL and try again.',
]

type Props = {|
  +goToIndex: () => void,
|}

const NotFoundView = ({ goToIndex }: Props) => (
  <div className='not-found-view'>
    <div className='content'>
      <JThumbnail
        color='white'
        image='auth-question'
        title='404. Page Not Found.'
        description={NOT_FOUND_DESCRIPTION}
      />
      <div className='actions'>
        <div className='back'>
          <JFlatButton
            onClick={goToIndex}
            color='white'
            label='Back to Home'
          />
        </div>
      </div>
    </div>
  </div>
)

export default NotFoundView
