// @flow

import React from 'react'
import { useI18n } from 'app/hooks'
import { Scrollbars } from 'react-custom-scrollbars'

import {
  JThumbnail,
  JFlatButton,
} from 'components/base'

const SingularTabBlockScreen = () => {
  const i18n = useI18n()

  // FIXME
  const descriptionText = [
    i18n._(
      'MultiTabBlocker.description.0',
      null,
      { defaults: 'Jwallet can be open only in one tab simultaneously.' },
    ),
    i18n._(
      'MultiTabBlocker.description.1',
      null,
      { defaults: 'Please reload this tab to continue using it.' },
    ),
  ]

  return (
    <div className='wallets-layout'>
      <Scrollbars autoHide>
        <div className='not-found-view'>
          <div className='content'>
            <JThumbnail
              color='white'
              image='bad-browser'
              title={i18n._(
                'MultiTabBlocker.title',
                null,
                { defaults: 'Jwallet supports only single tab' },
              )}
              description={descriptionText}
            />
            <div className='actions'>
              <div className='back'>
                <JFlatButton
                  onClick={() => { window.location.reload(false) }}
                  color='white'
                  label={i18n._(
                    'MultiTabBlocker.reload',
                    null,
                    { defaults: 'Reload Page' },
                  )}
                  isHoverOpacity
                />
              </div>
            </div>
          </div>
        </div>
      </Scrollbars>
    </div>
  )
}

export default SingularTabBlockScreen
