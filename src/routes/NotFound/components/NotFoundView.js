// @flow

import React from 'react'

import { JThumbnail, JFlatButton } from 'components/base'

const NotFoundDescription = [
  'The page you\'re looking for can\'t be found.',
  'Check the URL and try again.',
]

const NotFoundView = ({ goToIndex }: Props) => (
  <div className='not-found-view'>
    <div className='content'>
      <JThumbnail
        color='white'
        image='auth-question'
        title='404. Page Not Found.'
        description={NotFoundDescription}
      />
      <div className='back'>
        <div className='link'>
          <JFlatButton
            onClick={goToIndex}
            label='Back to Home'
            color='white'
            isTransparent
          />
        </div>
      </div>
    </div>
  </div>
)

type Props = {
  goToIndex: Function,
}

export default NotFoundView
