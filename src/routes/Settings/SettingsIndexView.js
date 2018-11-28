// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'
import { SettingsGrid } from 'components'

import settingsList from './routes'

class SettingsIndexView extends PureComponent<*, *> {
  render() {
    return (
      <div className='settings-view'>
        <header className='header'>
          <div className='container'>
            <JText value='Settings' size='header' color='dark' />
          </div>
        </header>
        <main className='content'>
          <div className='container'>
            <SettingsGrid items={settingsList} />
          </div>
        </main>
      </div>
    )
  }
}

export default SettingsIndexView
