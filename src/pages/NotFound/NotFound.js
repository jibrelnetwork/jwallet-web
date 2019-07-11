// @flow

import React from 'react'
import { useI18n } from 'app/hooks'

import {
  JThumbnail,
  JFlatButton,
} from 'components/base'

export function NotFound() {
  const i18n = useI18n()

  return (
    <div className='not-found-view'>
      <div className='content'>
        <JThumbnail
          color='white'
          image='auth-question'
          title={i18n._(
            'NotFound.title',
            null,
            { defaults: '404 – Page Not Found' },
          )}
          isTransparent
          description={[
            i18n._(
              'NotFound.description.0',
              null,
              { defaults: 'The page you\'re looking for can\'t be found.' },
            ),
            i18n._(
              'NotFound.description.1',
              null,
              { defaults: 'Check the URL and try again.' },
            ),
          ]}
        />
        <div className='actions'>
          <JFlatButton
            className='back'
            to='/'
            color='white'
            label={i18n._(
              'NotFound.goHome',
              null,
              { defaults: 'Back to Home' },
            )}
          />
        </div>
      </div>
    </div>
  )
}
