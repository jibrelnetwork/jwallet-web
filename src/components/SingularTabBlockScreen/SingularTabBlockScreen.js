// @flow

import React from 'react'
import { t } from 'ttag'

import { JThumbnail, JFlatButton } from 'components/base'
import { Scrollbars } from 'react-custom-scrollbars'

const SingularTabBlockScreen = () => (
  <div className='wallets-layout'>
    <Scrollbars autoHide>
      <div className='not-found-view'>
        <div className='content'>
          <JThumbnail
            color='white'
            iconSize='xlarge'
            image='bad-browser'
            title={t`Jwallet supports only single tab`}
            description={[
              t`Jwallet can be open only in one tab simultaneously.`,
              t`Please reload this tab to continue using it.`,
            ]}
          />
          <div className='actions'>
            <div className='back'>
              <JFlatButton
                onClick={() => { window.location.reload(false) }}
                color='white'
                label={t`Reload Page`}
                isHoverOpacity
              />
            </div>
          </div>
        </div>
      </div>
    </Scrollbars>
  </div>
)

export default SingularTabBlockScreen
