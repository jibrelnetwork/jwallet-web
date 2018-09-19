// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import JIcon from '../../../src/components/base/JIcon'

storiesOf('JIcon')
  .add('Different sizes', () => (
    <div>
      <h2>{'small'}</h2>
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
      <h2>{'medium'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      <h2>{'large'}</h2>
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

      <h2>{'s14'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s14'
            color='white'
            name='eye'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s14'
            color='white'
            name='cross-white'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s14'
            color='white'
            name='chevon-down'
          />
        </div>
      </div>

      <h2>{'s16'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s16'
            color='blue'
            name='chevon-down'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s16'
            color='gray'
            name='lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s16'
            color='gray'
            name='plus'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s16'
            color='gray'
            name='unchecked'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s16'
            color='blue'
            name='checked'
          />
        </div>
      </div>

      <h2>{'s20'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='back-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='binding'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='dotts-border'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='download'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='multy'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='password'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='plus'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='protect'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='refresh'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s20'
            color='white'
            name='star'
          />
        </div>
      </div>

      <h2>{'s24'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='arrow-left'
          />
        </div>

        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='multy'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='binding'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='upload'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='time'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='edit'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='dotts-full'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='refresh'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='star-add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='star-remove'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='message-add'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='message-edit'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='search'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='filter'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='filter-selected'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='priority-high'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='priority-normal'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='priority-low'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='priority-custom'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            name='transaction-receive'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            name='transaction-send'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            name='flag-us'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            name='flag-ru'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            name='flag-kr'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='arrow-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='network'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='list'
          />
        </div>

        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='local-currency'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='language'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='lock-pin'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='exchange-service'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='protect'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='backup-wallet'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='network'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='red'
            name='cross-circle'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='edit-pen'
          />
        </div>
      </div>

      <h2>{'s48'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s48'
            name='screen-reload'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s48'
            name='screen-error'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s48'
            name='screen-search'
          />
        </div>
      </div>

      <h2>{'s90'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s90'
            name='auth-arrow'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s90'
            name='auth-cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s90'
            name='auth-lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s90'
            name='auth-question'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s90'
            name='auth-warning'
          />
        </div>
      </div>
    </div>
  ))
  .add('Different colors', () => (
    <div>
      <h2>{'blue'}</h2>
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
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='time'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='s24'
            color='blue'
            name='list'
          />
        </div>
      </div>
      <h2>{'gray'}</h2>
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
            size='s20'
            color='gray'
            name='back-up'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='binding'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='dotts-border'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='download'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='lock'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='message'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='multy'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='password'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='plus'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='protect'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='refresh'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='setting'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s20'
            color='gray'
            name='star'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='cross'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='gray'
            name='add'
          />
        </div>
      </div>
      <h2>{'sky'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='sky'
            name='edit'
          />
        </div>

        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='s24'
            color='sky'
            name='import'
          />
        </div>
        <div style={{ padding: '3px', backgroundColor: '#transparent' }}>
          <JIcon
            size='s24'
            color='sky'
            name='list'
          />
        </div>
      </div>

      <h2>{'red'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: 'transparent' }}>
          <JIcon
            size='s24'
            color='red'
            name='time'
          />
        </div>
      </div>
      <h2>{'white'}</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ padding: '3px', backgroundColor: '#003DC6' }}>
          <JIcon
            size='s24'
            color='white'
            name='cross-circle'
          />
        </div>
      </div>
    </div>
  ))
