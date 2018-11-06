// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../../src/components/base/JIcon'

storiesOf('JIcon')
  .add('Different sizes', () => (
    <div>
      <h2>small</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          color='gray'
          size='small'
          name='close'
        />
        <JIcon
          color='gray'
          size='small'
          name='info-clear'
        />
        <JIcon
          color='gray'
          size='small'
          name='settings'
        />
      </div>
      <h2>medium</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <JIcon
          color='gray'
          size='medium'
          name='logout'
        />
        <JIcon
          color='gray'
          size='medium'
          name='close-header'
        />
        <JIcon
          color='gray'
          size='medium'
          name='search'
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='eye'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='padding-cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='chevron-down'
          />
        </div>

        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='back-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='binding'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='dots-border'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='download'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='padding-multy'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='password'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='plus'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='protect'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='refresh'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='star'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='arrow-left'
          />
        </div>

        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='multy'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='binding'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='padding-lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='plus'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='unchecked'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='checked'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='upload'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='time'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='edit'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='dots-full'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='refresh'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='star-add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='star-remove'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='message-add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='message-edit'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='search'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='filter'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='filter-selected'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='setting-grid'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='priority-high'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='priority-normal'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='priority-low'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='priority-custom'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            name='transaction-receive'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            name='transaction-send'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            name='flag-us'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            name='flag-ru'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            name='flag-kr'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='arrow-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='network'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='local-currency'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='language'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='lock-pin'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='exchange-service'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='protect'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='backup-wallet'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='network'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='red'
            name='cross-circle'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='edit-pen'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='sort-alphabet-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='sort-alphabet-down'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='sort-desc'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='sort-asc'
          />
        </div>
      </div>
      <h2>large</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          size='large'
          color='gray'
          name='transaction-send'
        />
        <JIcon
          size='large'
          color='blue'
          name='transaction-receive'
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='large'
            name='screen-reload'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='large'
            name='screen-error'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='large'
            name='screen-search'
          />
        </div>
      </div>

      <h2>xlarge</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='xlarge'
            name='auth-arrow'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='xlarge'
            name='auth-cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='xlarge'
            name='auth-lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='xlarge'
            name='auth-question'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='xlarge'
            name='auth-warning'
          />
        </div>
      </div>
    </div>
  ))
  .add('Different colors', () => (
    <div>
      <h2>blue</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          size='small'
          name='arrow'
          color='blue'
        />
        <JIcon
          size='small'
          color='blue'
          name='checkbox'
        />
        <JIcon
          size='small'
          color='blue'
          name='plus'
        />
        <JIcon
          size='small'
          color='blue'
          name='repeat'
        />
        <JIcon
          name='star'
          size='small'
          color='blue'
        />
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='chevron-down'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='time'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='medium'
            color='blue'
            name='list'
          />
        </div>
      </div>
      <h2>gray</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <JIcon
          name='close'
          size='small'
          color='gray'
        />
        <JIcon
          size='small'
          color='gray'
          name='expand'
        />
        <JIcon
          name='eye'
          size='small'
          color='gray'
        />
        <JIcon
          name='lock'
          size='small'
          color='gray'
        />
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='back-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='padding-binding'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='dots-border'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='download'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='padding-multy'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='password'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='plus'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='protect'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='refresh'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='star'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='gray'
            name='add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            name='close-padding'
            size='small'
            color='gray'
          />
        </div>
      </div>
      <h2>sky</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='sky'
            name='edit'
          />
        </div>

        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='medium'
            color='sky'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='medium'
            color='sky'
            name='list'
          />
        </div>
      </div>

      <h2>red</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='medium'
            color='red'
            name='time'
          />
        </div>
      </div>
      <h2>white</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='cross-circle'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='medium'
            color='white'
            name='padding-lock'
          />
        </div>
      </div>
    </div>
  ))
